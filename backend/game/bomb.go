package game

func (g *Game) PlaceBomb(player *Player) (bomb *Bomb) {
	for i := range player.Bombs[:len(player.Bombs)-1] {
		if player.Bombs[i].Cell == nil {
			player.Bombs[i].Cell = player.Cell
			return &player.Bombs[i]
		}
	}

	if player.PowerUp == PowerUpTypeBombCount {
		if player.Bombs[len(player.Bombs)-1].Cell == nil {
			player.Bombs[len(player.Bombs)-1].Cell = player.Cell
			return &player.Bombs[len(player.Bombs)-1]
		}
	}

	return nil
}

func (g *Game) ExplodeBomb(player *Player, bomb *Bomb) {
	bombCell := bomb.Cell

	bombPower := BombPower

	if player.PowerUp == PowerUpTypeBombPower {
		bombPower += PowerUpEffectBombPower
	}

	g.ExplodeCell(bomb, bombCell.X, bombCell.Y)

	for i := 1; i <= bombPower; i++ {
		if g.ExplodeCell(bomb, bombCell.X, bombCell.Y-i) {
			break
		}
	}
	for i := 1; i <= bombPower; i++ {
		if g.ExplodeCell(bomb, bombCell.X, bombCell.Y+i) {
			break
		}
	}
	for i := 1; i <= bombPower; i++ {
		if g.ExplodeCell(bomb, bombCell.X-i, bombCell.Y) {
			break
		}
	}
	for i := 1; i <= bombPower; i++ {
		if g.ExplodeCell(bomb, bombCell.X+i, bombCell.Y) {
			break
		}
	}
}

func (g *Game) RemoveBomb(bomb *Bomb) {
	bomb.Cell = nil
	bomb.DamagedCells = nil
}

func (g *Game) ExplodeCell(bomb *Bomb, x, y int) bool {
	if x <= 0 || x >= MapSize-1 || y <= 0 || y >= MapSize-1 {
		return true
	}

	cell := &g.Map[x][y]

	if cell.Type == CellTypeUnbreakableWall {
		return true
	}

	bomb.DamagedCells = append(bomb.DamagedCells, cell)

	if cell.Type == CellTypeWall {
		cell.Type = CellTypeEmpty
		return true
	}

	return false
}
