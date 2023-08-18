package handlers

import (
	"backend/ws"
)

func (h *Handlers) internalDisconnect(_ ws.Message, client *ws.Client) {
	player := h.Game.GetPlayer(client)
	if player == nil {
		return
	}

	playerName := player.Name

	h.Game.RemovePlayer(playerName)

	users := make([]string, 0, len(h.Game.Players))
	for _, player := range h.Game.Players {
		users = append(users, player.Name)
	}

	h.Hub.Broadcast(ws.NewMessage("users/update", struct {
		Users []string `json:"users"`
	}{
		Users: users,
	}))

	h.Hub.Broadcast(ws.NewMessage("chat/message", chatMessageItem{
		Username: "",
		Content:  playerName + " has disconnected",
	}))

	h.gameCheck()
}
