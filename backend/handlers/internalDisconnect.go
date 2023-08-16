package handlers

import (
	"backend/ws"
)

func (h *Handlers) internalDisconnect(_ ws.Message, client *ws.Client) {
	player := h.Game.GetPlayer(client)

	if player == nil {
		return
	}

	h.Game.RemovePlayer(player)

	h.Hub.Broadcast(ws.NewMessage("users/disconnect", player.Name))
}
