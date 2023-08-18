package game

import (
	"backend/ws"
	"sync"
	"time"
)

type CellType int

const (
	CellTypeEmpty           CellType = 0
	CellTypeWall            CellType = 1
	CellTypeUnbreakableWall CellType = 2
)

type Cell struct {
	X int
	Y int

	Type CellType

	Secret PowerUpType
}

type Player struct {
	Name   string
	Client *ws.Client

	Lives int

	Cell *Cell

	PrevMoveTime time.Time

	Bombs [MaxBombCount + 1]Bomb // +1 if the player has a PowerUpTypeBombCount

	PowerUp PowerUpType
}

type Bomb struct {
	Cell         *Cell
	DamagedCells []*Cell
}

type State string

const (
	StateEmpty    State = "empty"
	StateAlone    State = "alone"
	StateWaiting  State = "waiting"
	StateStarting State = "starting"
	StatePlaying  State = "playing"
	StateFinished State = "finished"
)

type Game struct {
	Players [MaxPlayerCount]Player
	State   State
	Map     [MapSize][MapSize]Cell

	Countdown time.Duration

	mux sync.Mutex
}

func NewGame() *Game {
	return &Game{
		Players: [MaxPlayerCount]Player{},
		State:   StateEmpty,
		Map:     [MapSize][MapSize]Cell{},

		Countdown: -1,

		mux: sync.Mutex{},
	}
}

func (g *Game) AddPlayer(name string, client *ws.Client) {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i, player := range g.Players {
		if player.Name == "" {
			g.Players[i] = Player{
				Name:   name,
				Client: client,
				Lives:  LifeCount,
			}
			break
		}
	}
}

func (g *Game) GetPlayer(client *ws.Client) *Player {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i := range g.Players {
		if g.Players[i].Client == client {
			return &g.Players[i]
		}
	}
	return nil
}

func (g *Game) GetActivePlayers() []*Player {
	g.mux.Lock()
	defer g.mux.Unlock()

	var activePlayers []*Player
	for i := range g.Players {
		if g.Players[i].Name != "" {
			activePlayers = append(activePlayers, &g.Players[i])
		}
	}
	return activePlayers
}

func (g *Game) GetPlayersCount() int {
	g.mux.Lock()
	defer g.mux.Unlock()

	count := 0
	for _, player := range g.Players {
		if player.Name != "" {
			count++
		}
	}
	return count
}

func (g *Game) RemovePlayer(playerName string) {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i, p := range g.Players {
		if p.Name == playerName {
			g.Players[i] = Player{}
			break
		}
	}
}
