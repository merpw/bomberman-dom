package handlers

import (
	"backend/ws"
	"encoding/json"
	"log"
)

type chatMessageItem struct {
	Username string `json:"username"`
	Content  string `json:"content"`
}

// chatMessage is a handler for chat/message event
func (h *Handlers) chatMessage(message ws.Message, client *ws.Client) {
	var item chatMessageItem
	err := json.Unmarshal(message.Item, &item)
	if err != nil {
		log.Println(err)
	}

	if item.Content == "" {
		log.Println("WARN: empty content")
		return
	}

	if item.Username == "" {
		item.Username = client.Name
	}

	h.Hub.Broadcast(ws.NewMessage("chat/message", item))
}
