package handlers

import (
	"backend/ws"
)

func (h *Handlers) test(message ws.Message, client *ws.Client) {
	h.Hub.Broadcast(ws.Message{
		Type: "test",
		Item: message.Item,
	})
}
