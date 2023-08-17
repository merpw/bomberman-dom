package game

import "backend/ws"

type StateMessage struct {
	State     State `json:"state"`
	Countdown *int  `json:"countdown"`
}

func (g *Game) GetUpdateStateMessage() ws.Message {
	var countdown *int
	if g.Countdown > 0 {
		countdown = &g.Countdown
	}
	return ws.NewMessage("game/updateState", StateMessage{
		State:     g.State,
		Countdown: countdown,
	})
}
