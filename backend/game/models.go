package game

import (
	"backend/ws"
	"sync"
	"time"
)

type CellType int

const (
	CellTypeEmpty CellType = 0
	CellTypeWall  CellType = 1
)

type Cell struct {
	X int
	Y int

	Type CellType
}

type Player struct {
	Name   string
	Client *ws.Client

	Cell *Cell

	PrevMoveTime time.Time
}

type State string

const (
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

	Countdown int

	mux sync.Mutex
}

func NewGame() *Game {
	return &Game{
		Map:       [MapSize][MapSize]Cell{},
		Players:   [MaxPlayerCount]Player{},
		Countdown: -1,
		mux:       sync.Mutex{},
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

func (g *Game) GetPlayerNumber(player *Player) int {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i, p := range g.Players {
		if p == *player {
			return i
		}
	}
	return -1
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

func (g *Game) RemovePlayer(player *Player) {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i, p := range g.Players {
		if p == *player {
			g.Players[i] = Player{}
			break
		}
	}
}
