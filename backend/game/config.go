package game

import "time"

// MapSize is the size of the map, odd numbers looks better
const MapSize = 11

const MaxPlayerCount = 4
const MinPlayerCount = 2

const (
	CountdownUsersJoin = 20 * time.Second
	CountdownGameStart = 10 * time.Second
	CountdownGameEnd   = 10 * time.Second
)

const WallDensity = 0.4

// MoveCooldown is the time between two moves
const MoveCooldown = 250 * time.Millisecond

const MaxBombCount = 3

const BombTime = 3000 * time.Millisecond
const BombExplodeTime = 1000 * time.Millisecond
const BombPower = 1

const LifeCount = 3

type PowerUpType string

const (
	PowerUpTypeBombCount PowerUpType = "bombCount"
	PowerUpTypeBombPower PowerUpType = "bombPower"
	PowerUpTypeSpeed     PowerUpType = "speed"
	PowerUpTypeLife      PowerUpType = "life"
)

var PowerUps = []PowerUpType{
	PowerUpTypeBombCount,
	PowerUpTypeBombPower,
	PowerUpTypeSpeed,
	PowerUpTypeLife,
}
