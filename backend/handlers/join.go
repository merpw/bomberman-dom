package handlers

import (
	"backend/game"
	"backend/ws"
	"encoding/json"
	"log"
)

// join is a handler for `type: 'join'` event, it adds player to game
func (h *Handlers) join(message ws.Message, client *ws.Client) {
	var joinItem struct {
		Username string `json:"username"`
	}
	err := json.Unmarshal(message.Item, &joinItem)
	if err != nil {
		log.Println(err)
		return
	}

	if h.Game.State == game.StatePlaying || h.Game.State == game.StateStarting {
		log.Println("WARN: game is already started")
		client.SendError("Game is already started", true)
		return
	}

	name := joinItem.Username

	isFull := h.Game.GetPlayersCount() == game.MaxPlayerCount

	if isFull {
		log.Println("WARN: game is full")
		client.SendError("Game is full", true)
		return
	}

	if name == "" {
		log.Println("WARN: empty name")
		client.SendError("Name is empty", true)
		return
	}

	for _, player := range h.Game.Players {
		if name == player.Name {
			log.Println("WARN: name already taken")
			client.SendError("Name is already taken", true)
			return
		}
	}

	h.Game.AddPlayer(name, client)

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
		Content:  name + " has connected",
	}))

	h.gameCheck()
}
