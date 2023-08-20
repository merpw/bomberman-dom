package game

import (
	"math/rand"
	"sort"
)

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
			g.fieldMap[x][y] = Cell{
				X:    x,
				Y:    y,
				Type: cellType,
			}
		}
	}

	// clear top left corner and bottom right corner for the first two players
	g.fieldMap[1][1].Type = CellTypeEmpty
	g.fieldMap[1][2].Type = CellTypeEmpty
	g.fieldMap[2][1].Type = CellTypeEmpty

	g.fieldMap[MapSize-2][MapSize-2].Type = CellTypeEmpty
	g.fieldMap[MapSize-2][MapSize-3].Type = CellTypeEmpty
	g.fieldMap[MapSize-3][MapSize-2].Type = CellTypeEmpty

	playersCount := g.GetPlayersCount()

	if playersCount >= 3 {
		// clear top right corner for third player
		g.fieldMap[MapSize-2][1].Type = CellTypeEmpty
		g.fieldMap[MapSize-2][2].Type = CellTypeEmpty
		g.fieldMap[MapSize-3][1].Type = CellTypeEmpty
	}

	if playersCount == 4 {
		// clear bottom left corner for fourth player
		g.fieldMap[1][MapSize-2].Type = CellTypeEmpty
		g.fieldMap[1][MapSize-3].Type = CellTypeEmpty
		g.fieldMap[2][MapSize-2].Type = CellTypeEmpty
	}

	var breakableWalls []*Cell
	for i := range g.fieldMap {
		for j := range g.fieldMap[i] {
			if g.fieldMap[i][j].Type == CellTypeWall {
				breakableWalls = append(breakableWalls, &g.fieldMap[i][j])
			}
		}
	}

	sort.Slice(breakableWalls, func(i, j int) bool {
		return rand.Float32() < 0.5
	})

	for i := 0; i < len(breakableWalls) && i < len(PowerUps); i++ {
		breakableWalls[i].Secret = PowerUps[i]
	}
}
