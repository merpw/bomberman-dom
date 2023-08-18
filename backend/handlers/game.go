package handlers

import "backend/game"

func (h *Handlers) gameCheck() {
	if h.Game.State != game.StatePlaying {
		h.lobbyCheck()
	}

	if len(h.Game.GetActivePlayers()) == 0 {
		h.Game = game.NewGame()
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		return
	}
}

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
