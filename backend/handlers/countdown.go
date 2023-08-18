package handlers

import (
	"backend/game"
	"time"
)

func (h *Handlers) countdownCheck() {
	if h.Game.State == game.StatePlaying {
		return
	}

	if h.Game.GetPlayersCount() < game.MinPlayerCount {
		h.Game.State = game.StateAlone
		h.Game.Countdown = game.CountdownUsersJoin
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		return
	}

	if h.Game.GetPlayersCount() == game.MaxPlayerCount {
		go h.countdownGameStart()
		return
	}

	if h.Game.GetPlayersCount() >= game.MinPlayerCount {
		go h.countdownJoin()
		return
	}
}

func (h *Handlers) countdownJoin() {
	h.Game.Countdown = game.CountdownUsersJoin
	h.Game.State = game.StateWaiting

	for {
		if h.Game.State != game.StateWaiting {
			return
		}
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		h.Game.Countdown = h.Game.Countdown - 1000
		if h.Game.Countdown < 0 {
			h.Game.Countdown = 0
			break
		}
		time.Sleep(1 * time.Second)
	}

	go h.countdownGameStart()
}

func (h *Handlers) countdownGameStart() {
	h.Game.Countdown = game.CountdownGameStart
	h.Game.State = game.StateStarting

	for {
		if h.Game.State != game.StateStarting {
			return
		}
		h.Hub.Broadcast(h.Game.GetUpdateStateMessage())
		h.Game.Countdown = h.Game.Countdown - 1000
		if h.Game.Countdown < 0 {
			h.Game.Countdown = 0
			break
		}
		time.Sleep(1 * time.Second)
	}

	h.gameStart()
}
