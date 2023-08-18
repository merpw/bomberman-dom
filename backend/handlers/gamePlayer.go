package handlers

import (
	"backend/game"
	"backend/ws"
	"encoding/json"
	"log"
	"time"
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

func (h *Handlers) gamePlayerPlaceBomb(_ ws.Message, client *ws.Client) {
	player := h.Game.GetPlayer(client)
	if player == nil {
		log.Println("WARN: player not found")
		return
	}

	bombNumber := h.Game.PlaceBomb(player)
	if bombNumber == nil {
		// no bombs left
		return
	}
	h.Hub.Broadcast(h.Game.GetBombsMessage(player))

	time.Sleep(game.BombTime)
	h.Game.ExplodeBomb(bombNumber)
	h.Hub.Broadcast(h.Game.GetBombsMessage(player))
	h.Hub.Broadcast(h.Game.GetMapMessage())
}
