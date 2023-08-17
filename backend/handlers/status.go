package handlers

import (
	"backend/game"
	"encoding/json"
	"log"
	"net/http"
)

type GameStatus struct {
	Users     []string   `json:"users"`
	GameState game.State `json:"gameState"`
}

// Status is an HTTP handler that returns the current GameStatus of the server
func (h *Handlers) Status(w http.ResponseWriter, r *http.Request) {

	users := make([]string, 0, len(h.Game.Players))
	for _, client := range h.Game.Players {
		users = append(users, client.Name)
	}

	status := GameStatus{
		Users:     users,
		GameState: game.StateWaiting,
	}

	// send GameStatus:
	SendObject(w, status)
}

// SendObject sends an object to http.ResponseWriter
//
// panics if an error occurs
func SendObject(w http.ResponseWriter, object any) {
	w.Header().Set("Content-Type", "application/json")
	objJson, err := json.Marshal(object)
	if err != nil {
		log.Panic(err)
		return
	}
	_, err = w.Write(objJson)
	if err != nil {
		log.Panic(err)
		return
	}
}
