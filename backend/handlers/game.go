package handlers

import "backend/game"

func (h *Handlers) gameCheck() {
	if h.Game.GetState() != game.StatePlaying {
		h.lobbyCheck()
	}

	var alivePlayersCount int
	for _, player := range h.Game.GetPlayers() {
		if player.Lives > 0 {
			alivePlayersCount++
		}
	}

	if alivePlayersCount == 0 {
		h.Game = game.NewGame()
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		return
	}

	if h.Game.GetState() == game.StatePlaying && alivePlayersCount == 1 {
		h.Game.SetState(game.StateFinished)
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		h.lobbyEndGame()
		return
	}
}

func (h *Handlers) gameStart() {
	h.Game.SetState(game.StatePlaying)
	h.Game.SetCountdown(-1)
	h.Hub.Broadcast(h.Game.GetUpdateStateMessage())

	h.Game.InitMap()
	h.Hub.Broadcast(h.Game.GetMapMessage())

	h.Game.SpawnPlayers()

	for _, player := range h.Game.GetPlayers() {
		if player.Name != "" {
			h.Hub.Broadcast(h.Game.GetPlayerMessage(player.Name))
		}
	}
}
