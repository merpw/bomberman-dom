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

const PlayerCount = 4

type Game struct {
	Players [PlayerCount]Player
	Map     [MapSize][MapSize]Cell

	mux sync.Mutex
}

func NewGame() *Game {
	return &Game{
		Map:     [MapSize][MapSize]Cell{},
		Players: [PlayerCount]Player{},
		mux:     sync.Mutex{},
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
