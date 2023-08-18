package game

import "math/rand"

func getRandomCellType() CellType {
	if rand.Float32() < WallDensity {
		return CellTypeWall
	}
	return CellTypeEmpty
}

func (g *Game) InitMap() {
	for x := 0; x < MapSize; x++ {
		for y := 0; y < MapSize; y++ {
			var cellType CellType
			if x == 0 || y == 0 || x == MapSize-1 || y == MapSize-1 || (x%2 == 0 && y%2 == 0) {
				// walls around the map
				cellType = CellTypeUnbreakableWall
			} else {
				cellType = getRandomCellType()
			}
			g.Map[x][y] = Cell{
				X:    x,
				Y:    y,
				Type: cellType,
			}
		}
	}

	// clear top left corner and bottom right corner for the first two players
	g.Map[1][1].Type = CellTypeEmpty
	g.Map[1][2].Type = CellTypeEmpty
	g.Map[2][1].Type = CellTypeEmpty

	g.Map[MapSize-2][MapSize-2].Type = CellTypeEmpty
	g.Map[MapSize-2][MapSize-3].Type = CellTypeEmpty
	g.Map[MapSize-3][MapSize-2].Type = CellTypeEmpty

	playersCount := g.GetPlayersCount()

	if playersCount >= 3 {
		// clear top right corner for third player
		g.Map[MapSize-2][1].Type = CellTypeEmpty
		g.Map[MapSize-2][2].Type = CellTypeEmpty
		g.Map[MapSize-3][1].Type = CellTypeEmpty
	}

	if playersCount == 4 {
		// clear bottom left corner for fourth player
		g.Map[1][MapSize-2].Type = CellTypeEmpty
		g.Map[1][MapSize-3].Type = CellTypeEmpty
		g.Map[2][MapSize-2].Type = CellTypeEmpty
	}
}
