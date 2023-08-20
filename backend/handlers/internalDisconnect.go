package handlers

import (
	"backend/ws"
)

func (h *Handlers) internalDisconnect(_ ws.Message, client *ws.Client) {
	player := h.Game.GetPlayer(client)
	if player.Name == "" {
		return
	}

	playerName := player.Name

	h.Game.RemovePlayer(playerName)

	users := make([]string, 0, len(h.Game.GetPlayers()))
	for _, player := range h.Game.GetPlayers() {
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
