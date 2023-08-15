// Package handlers handles WebSocket Message's
package handlers

import (
	"backend/ws"
	"encoding/json"
	"log"
	"runtime/debug"
)

// PrimaryHandler returns ws.MessageHandler with all routes registered
func (h *Handlers) PrimaryHandler() ws.MessageHandler {

	var events = []Event{
		newEvent("test", h.test),
	}

	return func(messageBody []byte, client *ws.Client) {
		defer func() {
			if r := recover(); r != nil {
				log.Printf("ERROR 500, %s\n%s", r, debug.Stack())
			}
		}()

		log.Printf("received from %s %s\n", client.Conn.RemoteAddr(), messageBody)

		var message ws.Message
		err := json.Unmarshal(messageBody, &message)
		if err != nil {
			log.Println(err)
		}

		for _, event := range events {
			if event.Type == message.Type {
				event.Handler(message, client)
				return
			}
		}

		log.Printf("WARN: no handler for %s\n", message.Type)
	}
}

type Handlers struct {
	Hub *ws.Hub
}

// New connects database to Handlers
func New() *Handlers {
	return &Handlers{}
}

// Event is a websocket event (server.Route analog)
type Event struct {
	Type    string
	Handler func(message ws.Message, client *ws.Client)
}

func newEvent(t string, h func(message ws.Message, client *ws.Client)) Event {
	return Event{
		Type:    t,
		Handler: h,
	}
}
