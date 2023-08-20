package handlers

import (
	"backend/game"
	"time"
)

func (h *Handlers) lobbyCheck() {
	if h.Game.GetState() == game.StatePlaying {
		return
	}

	if h.Game.GetPlayersCount() < game.MinPlayerCount {
		h.Game.SetState(game.StateAlone)
		h.Game.SetCountdown(game.CountdownUsersJoin)
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		return
	}

	if h.Game.GetPlayersCount() == game.MaxPlayerCount {
		h.lobbyStartGame()
		return
	}

	if h.Game.GetPlayersCount() >= game.MinPlayerCount {
		h.lobbyJoin()
		return
	}
}

func (h *Handlers) lobbyJoin() {
	h.Game.SetCountdown(game.CountdownUsersJoin)
	h.Game.SetState(game.StateWaiting)

	for {
		if h.Game.GetState() != game.StateWaiting {
			return
		}
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		h.Game.DecreaseCountdown(time.Second)
		if h.Game.GetCountdown() < 0 {
			h.Game.SetCountdown(0)
			break
		}
		time.Sleep(1 * time.Second)
	}

	h.lobbyStartGame()
}

func (h *Handlers) lobbyStartGame() {
	h.Game.SetCountdown(game.CountdownGameStart)
	h.Game.SetState(game.StateStarting)

	for {
		if h.Game.GetState() != game.StateStarting {
			return
		}
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		h.Game.DecreaseCountdown(time.Second)
		if h.Game.GetCountdown() < 0 {
			h.Game.SetCountdown(0)
			break
		}
		time.Sleep(1 * time.Second)
	}

	h.gameStart()
}

func (h *Handlers) lobbyEndGame() {
	h.Game.SetCountdown(game.CountdownGameEnd)
	h.Game.SetState(game.StateFinished)

	for {
		if h.Game.GetState() != game.StateFinished {
			return
		}
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		h.Game.DecreaseCountdown(time.Second)
		if h.Game.GetCountdown() < 0 {
			h.Game.SetCountdown(0)
			break
		}
		time.Sleep(1 * time.Second)
	}

	h.Game = game.NewGame()
	h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
	for _, client := range h.Hub.Clients {
		client.SendError("Game is over", true)
	}
}
