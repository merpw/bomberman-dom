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

type MapMessage struct {
	Map [MapSize][MapSize]CellType `json:"map"`
}

func (g *Game) GetMapMessage() ws.Message {
	var gameMap [MapSize][MapSize]CellType
	for x := 0; x < MapSize; x++ {
		for y := 0; y < MapSize; y++ {
			gameMap[x][y] = g.Map[x][y].Type
		}
	}
	return ws.NewMessage("game/updateMap", MapMessage{
		Map: gameMap,
	})
}

type PlayerMessage struct {
	Name string `json:"name"`
	X    int    `json:"x"`
	Y    int    `json:"y"`
}

func (g *Game) GetPlayerMessage(player *Player) ws.Message {
	return ws.NewMessage("game/updatePlayer", PlayerMessage{
		Name: player.Name,
		X:    player.Cell.X,
		Y:    player.Cell.Y,
	})
}
