package handlers

import (
	"backend/game"
	"backend/ws"
	"encoding/json"
	"log"
)

func (h *Handlers) gamePlayerMove(message ws.Message, client *ws.Client) {
	var moveItem struct {
		Direction game.MoveDirection `json:"direction"`
	}
	err := json.Unmarshal(message.Item, &moveItem)
	if err != nil {
		log.Println(err)
		return
	}

	player := h.Game.GetPlayer(client)
	if player == nil {
		log.Println("WARN: player not found")
		return
	}

	h.Game.MovePlayer(player, moveItem.Direction)
	h.Hub.Broadcast(h.Game.GetPlayerMessage(player))
}
