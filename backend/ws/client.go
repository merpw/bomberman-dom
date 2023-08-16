package ws

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"strings"
)

// Client is a WebSocket client, stores connection and user data
type Client struct {
	Conn *websocket.Conn
}

// NewClient creates a new Client
func NewClient(conn *websocket.Conn) *Client {
	return &Client{
		Conn: conn,
	}
}

// Read calls specified MessageHandler on each message from the Client
func (c *Client) Read(messageHandler MessageHandler) {
	for {
		_, messageBody, err := c.Conn.ReadMessage()
		if err != nil {
			return
		}

		log.Printf("received %s from %s", messageBody, c.Conn.RemoteAddr())

		var message Message
		err = json.Unmarshal(messageBody, &message)
		if err != nil {
			log.Println(err)
			continue
		}

		if strings.HasPrefix(message.Type, "internal/") {
			log.Printf("WARN: internal message %s from %s", message, c.Conn.RemoteAddr())
			continue
		}

		messageHandler(message, c)
	}
}

func (c *Client) SendMessage(message Message) {
	err := c.Conn.WriteJSON(message)
	if err != nil {
		log.Println(err)
	}
}

func (c *Client) SendError(message string, isFatal bool) {
	err := c.Conn.WriteJSON(NewMessage("error", message))
	if err != nil {
		log.Println(err)
	}

	if isFatal {
		_ = c.Conn.Close()
	}
}
