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
		client.SendError("Unexpected error", true)
		return
	}

	if player.Lives < 1 {
		log.Println("WARN: player is dead")
		client.SendError("You are already dead", true)
		return
	}

	tookSecret := h.Game.MovePlayer(player, moveItem.Direction)
	h.Hub.Broadcast(h.Game.GetPlayerMessage(player))

	if tookSecret {
		h.Hub.Broadcast(h.Game.GetMapMessage())
	}
}

func (h *Handlers) gamePlayerPlaceBomb(_ ws.Message, client *ws.Client) {
	player := h.Game.GetPlayer(client)
	if player == nil {
		log.Println("WARN: player not found")
		return
	}

	if player.Lives == 0 {
		log.Println("WARN: player is dead")
		client.SendError("You are already dead", true)
		return
	}

	for _, p := range h.Game.Players {
		for _, bomb := range p.Bombs {
			if bomb.Cell == player.Cell {
				// A Bomb is already placed on this cell
				return
			}
		}
	}

	bomb := h.Game.PlaceBomb(player)
	if bomb == nil {
		// no bombs left
		return
	}
	h.Hub.Broadcast(h.Game.GetBombsMessage())

	time.Sleep(game.BombTime)
	h.Game.ExplodeBomb(player, bomb)
	h.Hub.Broadcast(h.Game.GetBombsMessage())
	h.Hub.Broadcast(h.Game.GetMapMessage())

	for _, damagedCell := range bomb.DamagedCells {
		for i := range h.Game.Players {
			if h.Game.Players[i].Cell == damagedCell {
				h.Game.Players[i].Lives--
				if h.Game.Players[i].Lives == 0 {
					h.Game.Players[i].Cell = nil
					h.Hub.Broadcast(h.Game.GetPlayerMessage(&h.Game.Players[i]))
					h.gameCheck()
					if h.Game.State == game.StateFinished {
						return
					}
				}
				h.Hub.Broadcast(h.Game.GetPlayerMessage(&h.Game.Players[i]))
			}
		}
	}

	time.Sleep(game.BombExplodeTime)

	h.Game.RemoveBomb(bomb)
	h.Hub.Broadcast(h.Game.GetBombsMessage())
}
