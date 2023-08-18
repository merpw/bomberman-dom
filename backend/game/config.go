package game

import "time"

const MapSize = 10

const MaxPlayerCount = 1
const MinPlayerCount = 1

const (
	CountdownUsersJoin = 0
	CountdownGameStart = 0
)

const WallDensity = 0.4

const MoveCooldown = 100 * time.Millisecond
const MoveSpeed = 100 * time.Millisecond
