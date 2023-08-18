package game

import "time"

const MapSize = 10

const MaxPlayerCount = 4
const MinPlayerCount = 2

const (
	CountdownUsersJoin = 20 * 1000
	CountdownGameStart = 10 * 1000
	CountdownGameEnd   = 10 * 1000
)

const WallDensity = 0.4

const MoveCooldown = 100 * time.Millisecond
const MoveSpeed = 100 * time.Millisecond

const MaxBombCount = 3

const BombTime = 3000 * time.Millisecond
const BombExplodeTime = 1000 * time.Millisecond
const BombPower = 2

const LifeCount = 3
