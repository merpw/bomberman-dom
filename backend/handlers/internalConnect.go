package handlers

import (
	"backend/ws"
	"encoding/json"
	"log"
)

func (h *Handlers) internalConnect(message ws.Message, client *ws.Client) {
	var name string
	err := json.Unmarshal(message.Item, &name)
	if err != nil {
		log.Println(err)
	}

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

	h.Hub.Broadcast(ws.NewMessage("users/connect", struct {
		Username string `json:"username"`
	}{
		Username: name,
	}))
}
