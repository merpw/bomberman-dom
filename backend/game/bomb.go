package game

func (g *Game) PlaceBomb(playerName string) (bombNumber int) {
	player := g.getPlayerPointer(playerName)
	g.mux.Lock()
	defer g.mux.Unlock()
	for i := range player.Bombs[:len(player.Bombs)-1] {
		if player.Bombs[i].Cell == nil {
			player.Bombs[i].Cell = player.Cell
			return i
		}
	}

	if player.PowerUp == PowerUpTypeBombCount {
		if player.Bombs[len(player.Bombs)-1].Cell == nil {
			player.Bombs[len(player.Bombs)-1].Cell = player.Cell
			return len(player.Bombs) - 1
		}
	}

	return -1
}

func (g *Game) ExplodeBomb(playerName string, bombNumber int) {
	player := g.getPlayerPointer(playerName)

	bomb := &player.Bombs[bombNumber]

	bombCell := bomb.Cell

	if bombCell == nil {
		return
	}

	bombPower := BombPower

	if player.PowerUp == PowerUpTypeBombPower {
		bombPower += PowerUpEffectBombPower
	}

	g.explodeCell(bomb, bombCell.X, bombCell.Y)

	for i := 1; i <= bombPower; i++ {
		if g.explodeCell(bomb, bombCell.X, bombCell.Y-i) {
			break
		}
	}
	for i := 1; i <= bombPower; i++ {
		if g.explodeCell(bomb, bombCell.X, bombCell.Y+i) {
			break
		}
	}
	for i := 1; i <= bombPower; i++ {
		if g.explodeCell(bomb, bombCell.X-i, bombCell.Y) {
			break
		}
	}
	for i := 1; i <= bombPower; i++ {
		if g.explodeCell(bomb, bombCell.X+i, bombCell.Y) {
			break
		}
	}
}

func (g *Game) RemoveBomb(playerName string, bombNumber int) {
	player := g.getPlayerPointer(playerName)
	g.mux.Lock()
	defer g.mux.Unlock()

	player.Bombs[bombNumber] = Bomb{}
}

func (g *Game) explodeCell(bomb *Bomb, x, y int) bool {
	g.mux.Lock()
	defer g.mux.Unlock()

	if x <= 0 || x >= MapSize-1 || y <= 0 || y >= MapSize-1 {
		return true
	}

	cell := &g.fieldMap[x][y]

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

func (g *Game) KillDamagedPlayers(playerName string, bombNumber int) (hasKills bool) {
	player := g.getPlayerPointer(playerName)

	damagedCells := player.Bombs[bombNumber].DamagedCells

	var damagedPlayers []Player

	for _, damagedCell := range damagedCells {
		for _, damagedPlayer := range g.players {
			if damagedPlayer.Name == "" {
				continue
			}
			if damagedPlayer.Cell.X == damagedCell.X && damagedPlayer.Cell.Y == damagedCell.Y {
				damagedPlayers = append(damagedPlayers, damagedPlayer)
			}
		}
	}

	if len(damagedPlayers) == 0 {
		return false
	}

	for _, damagedPlayer := range damagedPlayers {
		damagedPlayer.Lives--
		if damagedPlayer.Lives == 0 {
			damagedPlayer.Cell = nil
		}
		g.UpdatePlayer(damagedPlayer)
	}

	return true
}
