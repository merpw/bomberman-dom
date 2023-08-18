package game

import (
	"time"
)

func (g *Game) SpawnPlayers() {
	for i, player := range g.GetActivePlayers() {
		switch i {
		case 0:
			player.Cell = &g.Map[1][1]
		case 1:
			player.Cell = &g.Map[MapSize-2][MapSize-2]
		case 2:
			player.Cell = &g.Map[MapSize-2][1]
		case 3:
			player.Cell = &g.Map[1][MapSize-2]
		}
	}
}

type MoveDirection string

const (
	MoveDirectionUp    MoveDirection = "up"
	MoveDirectionDown  MoveDirection = "down"
	MoveDirectionLeft  MoveDirection = "left"
	MoveDirectionRight MoveDirection = "right"
)

func (g *Game) MovePlayer(player *Player, direction MoveDirection) {
	if time.Now().Sub(player.PrevMoveTime) < MoveCooldown {
		return
	}

	var targetCell *Cell
	switch direction {
	case MoveDirectionUp:
		targetCell = &g.Map[player.Cell.X][player.Cell.Y-1]
	case MoveDirectionDown:
		targetCell = &g.Map[player.Cell.X][player.Cell.Y+1]
	case MoveDirectionLeft:
		targetCell = &g.Map[player.Cell.X-1][player.Cell.Y]
	case MoveDirectionRight:
		targetCell = &g.Map[player.Cell.X+1][player.Cell.Y]
	}

	if targetCell.Type == CellTypeWall {
		return
	}

	time.Sleep(MoveSpeed)

	player.Cell = targetCell

	player.PrevMoveTime = time.Now()
}