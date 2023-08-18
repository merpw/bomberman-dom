// Package handlers handles WebSocket Message's
package handlers

import (
	"backend/game"
	"backend/ws"
	"log"
	"runtime/debug"
)

// PrimaryHandler returns ws.MessageHandler with all routes registered
func (h *Handlers) PrimaryHandler() ws.MessageHandler {

	var events = []Event{
		newEvent("chat/message", h.chatMessage),
		newEvent("join", h.join),
		newEvent("internal/disconnect", h.internalDisconnect),
		newEvent("game/playerMove", h.gamePlayerMove),
		newEvent("game/playerPlaceBomb", h.gamePlayerPlaceBomb),
	}

	return func(message ws.Message, client *ws.Client) {
		defer func() {
			if r := recover(); r != nil {
				log.Printf("ERROR 500, %s\n%s", r, debug.Stack())
			}
		}()

		for _, event := range events {
			if event.Type == message.Type {
				go event.Handler(message, client)
				return
			}
		}

		log.Printf("WARN: no handler for %s\n", message.Type)
	}
}

type Handlers struct {
	Hub  *ws.Hub
	Game *game.Game
}

// New connects database to Handlers
func New() *Handlers {
	return &Handlers{
		Game: game.NewGame(),
	}
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
