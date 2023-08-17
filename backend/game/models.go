package game

import (
	"backend/ws"
	"sync"
)

type CellType string

const (
	CellTypeEmpty CellType = "empty"
	CellTypeWall  CellType = "wall"
)

type Cell struct {
	X int
	Y int

	Type CellType
}

type Player struct {
	Name   string
	Client *ws.Client
}

const MapSize = 10

const MaxPlayerCount = 4
const MinPlayerCount = 2

type State string

const (
	StateAlone    State = "alone"
	StateWaiting  State = "waiting"
	StateStarting State = "starting"
	StatePlaying  State = "playing"
	StateFinished State = "finished"
)

const (
	CountdownUsersJoin = 20 * 1000
	CountdownGameStart = 10 * 1000
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

	for _, player := range g.Players {
		if player.Client == client {
			return &player
		}
	}
	return nil
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
