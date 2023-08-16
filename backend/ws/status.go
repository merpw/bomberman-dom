package ws

import (
	"encoding/json"
	"log"
	"net/http"
)

type GameState string

const (
	GameStateWaiting  GameState = "waiting"
	GameStatePlaying  GameState = "playing"
	GameStateFinished GameState = "finished"
)

type Status struct {
	Users     []string  `json:"users"`
	GameState GameState `json:"gameState"`
}

// StatusHandler is an HTTP handler that returns the current status of the server
func (h *Hub) StatusHandler(w http.ResponseWriter, r *http.Request) {

	users := make([]string, 0, len(h.Clients))
	for _, client := range h.Clients {
		users = append(users, client.Name)
	}

	status := Status{
		Users:     users,
		GameState: GameStateWaiting,
	}

	// send status:
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
