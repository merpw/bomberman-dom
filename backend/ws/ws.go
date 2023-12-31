// Package ws implements websocket connections
//
// It calls the specified primary MessageHandler on each message from the Client
package ws

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

// Hub is a WebSocket hub that handles all WebSocket connections.
//
// It calls the specified primary MessageHandler on each message from the Client
type Hub struct {
	mu      sync.Mutex
	Clients []*Client

	// MessageHandler is a primary MessageHandler, it is called on each message from the Client
	MessageHandler MessageHandler
}

// MessageHandler is a function that handles raw messages from the Client
type MessageHandler func(message Message, client *Client)

// NewHub creates new Hub with specified primary MessageHandler
func NewHub(messageHandler MessageHandler) *Hub {
	h := &Hub{
		MessageHandler: messageHandler,
	}

	return h
}

var wsUpgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	// TODO: remove this in production
	CheckOrigin: func(r *http.Request) (b bool) { return true },
}

type HandshakeBody struct {
	Name string `json:"name"`
}

// UpgradeHandler upgrades HTTP connection to WebSocket
func (h *Hub) UpgradeHandler(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			log.Println("ERROR 500: ", err)
		}
	}()

	conn, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("New connection from ", r.RemoteAddr)

	client := NewClient(conn)
	h.Register(client)

	go func() {
		defer func() {
			if err := recover(); err != nil {
				log.Println("ERROR 500: ", err)
			}
		}()
		client.Read(h.MessageHandler)
		log.Println("Connection closed: ", r.RemoteAddr)
		h.MessageHandler(NewMessage("internal/disconnect", nil), client)
		h.Unregister(client)
	}()
}

// Register registers new Client in the Hub
func (h *Hub) Register(client *Client) {
	h.mu.Lock()
	h.Clients = append(h.Clients, client)
	client.Conn.SetCloseHandler(func(code int, text string) error {
		h.Unregister(client)
		return nil
	})
	h.mu.Unlock()
}

// Unregister unregisters Client from the Hub
func (h *Hub) Unregister(client *Client) {
	h.mu.Lock()
	for i, c := range h.Clients {
		if c == client {
			h.Clients = append(h.Clients[:i], h.Clients[i+1:]...)
			break
		}
	}
	h.mu.Unlock()
}

// Broadcast sends data as JSON to all clients
func (h *Hub) Broadcast(data interface{}) {
	h.mu.Lock()

	for _, c := range h.Clients {
		err := c.Conn.WriteJSON(data)
		if err != nil {
			log.Println(err)
		}
	}

	h.mu.Unlock()
}
