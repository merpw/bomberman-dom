package game

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
