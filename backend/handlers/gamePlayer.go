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
	if player.Name == "" {
		log.Println("WARN: player not found")
		client.SendError("Unexpected error", true)
		return
	}

	if player.Lives < 1 {
		log.Println("WARN: player is dead")
		client.SendError("You are already dead", true)
		return
	}

	tookSecret := h.Game.MovePlayer(player.Name, moveItem.Direction)
	h.Hub.Broadcast(h.Game.GetPlayerMessage(player.Name))

	if tookSecret {
		h.Hub.Broadcast(h.Game.GetMapMessage())
	}
}

func (h *Handlers) gamePlayerPlaceBomb(_ ws.Message, client *ws.Client) {
	player := h.Game.GetPlayer(client)
	if player.Name == "" {
		log.Println("WARN: player not found")
		return
	}

	if player.Lives == 0 {
		log.Println("WARN: player is dead")
		client.SendError("You are already dead", true)
		return
	}

	for _, p := range h.Game.GetPlayers() {
		for _, bomb := range p.Bombs {
			if bomb.Cell == player.Cell {
				// A Bomb is already placed on this cell
				return
			}
		}
	}

	bombNumber := h.Game.PlaceBomb(player.Name)
	if bombNumber == -1 {
		// no bombs left
		return
	}
	h.Hub.Broadcast(h.Game.GetBombsMessage(player.Name))

	time.Sleep(game.BombTime)
	h.Game.ExplodeBomb(player.Name, bombNumber)
	h.Hub.Broadcast(h.Game.GetBombsMessage(player.Name))
	h.Hub.Broadcast(h.Game.GetMapMessage())

	hasKills := h.Game.KillDamagedPlayers(player.Name, bombNumber)

	h.Hub.Broadcast(h.Game.GetBombsMessage(player.Name))

	for _, player := range h.Game.GetPlayers() {
		if player.Name == "" {
			continue
		}
		h.Hub.Broadcast(h.Game.GetPlayerMessage(player.Name))
	}

	if hasKills {
		h.gameCheck()
		if h.Game.GetState() != game.StatePlaying {
			return
		}
	}

	time.Sleep(game.BombExplodeTime)

	h.Game.RemoveBomb(player.Name, bombNumber)
	h.Hub.Broadcast(h.Game.GetBombsMessage(player.Name))
}
