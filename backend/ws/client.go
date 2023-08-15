package ws

import (
	"github.com/gorilla/websocket"
)

// Client is a WebSocket client, stores connection and user data
type Client struct {
	Conn *websocket.Conn
	Name string
}

// NewClient creates a new Client
func NewClient(conn *websocket.Conn, name string) *Client {
	return &Client{
		Conn: conn,
		Name: name,
	}
}

// Read calls specified MessageHandler on each message from the Client
func (c *Client) Read(messageHandler MessageHandler) {
	for {
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			return
		}

		messageHandler(p, c)
	}
}
