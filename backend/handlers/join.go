package handlers

import (
	"backend/ws"
	"encoding/json"
	"log"
)

// join is a handler for `type: 'join'` event, it adds player to game
func (h *Handlers) join(message ws.Message, client *ws.Client) {
	var joinItem struct {
		Username string `json:"username"`
	}
	err := json.Unmarshal(message.Item, &joinItem)
	if err != nil {
		log.Println(err)
	}

	name := joinItem.Username

	isFull := true
	for _, player := range h.Game.Players {
		if player.Name == "" {
			isFull = false
			break
		}
	}

	if isFull {
		log.Println("WARN: game is full")
		client.SendError("Game is full", true)
		return
	}

	if name == "" {
		log.Println("WARN: empty name")
		client.SendError("Name is empty", true)
		return
	}

	for _, player := range h.Game.Players {
		if name == player.Name {
			log.Println("WARN: name already taken")
			client.SendError("Name is already taken", true)
			return
		}
	}

	h.Game.AddPlayer(name, client)

	h.Hub.Broadcast(ws.NewMessage("users/join", struct {
		Username string `json:"username"`
	}{
		Username: name,
	}))
}
