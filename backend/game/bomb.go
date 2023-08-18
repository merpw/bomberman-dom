package game

func (g *Game) PlaceBomb(player *Player) (bomb *Bomb) {
	for i := range player.Bombs {
		if player.Bombs[i].Cell == nil {
			player.Bombs[i].Cell = player.Cell
			return &player.Bombs[i]
		}
	}

	return nil
}

func (g *Game) ExplodeBomb(bomb *Bomb) {
	bombCell := bomb.Cell
	bomb.Cell = nil

	g.ExplodeCell(bombCell.X, bombCell.Y)

	for i := 1; i <= BombPower; i++ {
		if g.ExplodeCell(bombCell.X, bombCell.Y-i) {
			break
		}
	}
	for i := 1; i <= BombPower; i++ {
		if g.ExplodeCell(bombCell.X, bombCell.Y+i) {
			break
		}
	}
	for i := 1; i <= BombPower; i++ {
		if g.ExplodeCell(bombCell.X-i, bombCell.Y) {
			break
		}
	}
	for i := 1; i <= BombPower; i++ {
		if g.ExplodeCell(bombCell.X+i, bombCell.Y) {
			break
		}
	}
}

func (g *Game) ExplodeCell(x, y int) bool {
	if x <= 0 || x >= MapSize-1 || y <= 0 || y >= MapSize-1 {
		return true
	}

	cell := &g.Map[x][y]
	if cell.Type == CellTypeWall {
		cell.Type = CellTypeEmpty
		return true
	}

	//for _, player := range g.GetActivePlayers() {
	//	if player.Cell == cell {
	//		// g.KillPlayer(player)
	//		return true
	//	}
	//}

	return false
}
