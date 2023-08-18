package game

import "backend/ws"

type Coords struct {
	X int `json:"x"`
	Y int `json:"y"`
}

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

type SecretData struct {
	Coords
	Type PowerUpType `json:"type"`
}

type MapMessage struct {
	Map     [MapSize][MapSize]CellType `json:"map"`
	Secrets []SecretData               `json:"secrets,omitempty"`
}

func (g *Game) GetMapMessage() ws.Message {
	var gameMap [MapSize][MapSize]CellType
	var secrets []SecretData

	for x := 0; x < MapSize; x++ {
		for y := 0; y < MapSize; y++ {
			gameMap[x][y] = g.Map[x][y].Type
			if g.Map[x][y].Type == CellTypeEmpty && g.Map[x][y].Secret != "" {
				secrets = append(secrets, SecretData{
					Coords: Coords{
						X: x,
						Y: y,
					},
					Type: g.Map[x][y].Secret,
				})
			}
		}
	}
	return ws.NewMessage("game/updateMap", MapMessage{
		Map:     gameMap,
		Secrets: secrets,
	})
}

type PlayerMessage struct {
	Name  string `json:"name"`
	Lives int    `json:"lives"`
	Coords
}

func (g *Game) GetPlayerMessage(player *Player) ws.Message {
	coords := Coords{
		X: -1,
		Y: -1,
	}

	if player.Cell != nil {
		coords.X = player.Cell.X
		coords.Y = player.Cell.Y
	}

	return ws.NewMessage("game/updatePlayer", PlayerMessage{
		Name:   player.Name,
		Lives:  player.Lives,
		Coords: coords,
	})
}

type bombCellData struct {
	X            int      `json:"x"`
	Y            int      `json:"y"`
	DamagedCells []Coords `json:"damagedCells,omitempty"`
}

type BombsMessage struct {
	Bombs []bombCellData `json:"bombs,omitempty"`
}

func (g *Game) GetBombsMessage(player *Player) ws.Message {
	var bombs []bombCellData
	for _, bomb := range player.Bombs {
		if bomb.Cell != nil {
			var damagedCells []Coords
			for _, cell := range bomb.DamagedCells {
				damagedCells = append(damagedCells, Coords{
					X: cell.X,
					Y: cell.Y,
				})
			}
			bombs = append(bombs, bombCellData{
				X:            bomb.Cell.X,
				Y:            bomb.Cell.Y,
				DamagedCells: damagedCells,
			})
		}
	}
	return ws.NewMessage("game/updateBombs", BombsMessage{
		Bombs: bombs,
	})
}
