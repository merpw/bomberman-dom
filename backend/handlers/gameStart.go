package handlers

import "backend/game"

func (h *Handlers) gameStart() {
	h.Game.State = game.StatePlaying
	h.Game.Countdown = -1
	h.Hub.Broadcast(h.Game.GetUpdateStateMessage())

	h.Game.InitMap()
	h.Hub.Broadcast(h.Game.GetMapMessage())

	h.Game.SpawnPlayers()

	for _, player := range h.Game.GetActivePlayers() {
		h.Hub.Broadcast(h.Game.GetPlayerMessage(player))
	}
}
