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

	Direction MoveDirection

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
	players  [MaxPlayerCount]Player
	state    State
	fieldMap [MapSize][MapSize]Cell

	countdown time.Duration

	mux sync.Mutex
}

func NewGame() *Game {
	return &Game{
		players:  [MaxPlayerCount]Player{},
		state:    StateEmpty,
		fieldMap: [MapSize][MapSize]Cell{},

		countdown: -1,

		mux: sync.Mutex{},
	}
}

func (g *Game) AddPlayer(name string, client *ws.Client) {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i, player := range g.players {
		if player.Name == "" {
			g.players[i] = Player{
				Name:   name,
				Client: client,
				Lives:  LifeCount,
			}
			break
		}
	}
}

func (g *Game) GetPlayer(client *ws.Client) Player {
	g.mux.Lock()
	defer g.mux.Unlock()

	for _, player := range g.players {
		if player.Client == client {
			return player
		}
	}
	return Player{}
}

func (g *Game) getPlayerPointer(name string) *Player {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i := range g.players {
		if g.players[i].Name == name {
			return &g.players[i]
		}
	}
	return nil
}

func (g *Game) GetPlayersCount() int {
	g.mux.Lock()
	defer g.mux.Unlock()

	count := 0
	for _, player := range g.players {
		if player.Name != "" {
			count++
		}
	}
	return count
}

func (g *Game) RemovePlayer(playerName string) {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i, p := range g.players {
		if p.Name == playerName {
			g.players[i] = Player{}
			break
		}
	}
}

func (g *Game) UpdatePlayer(newPlayer Player) {
	g.mux.Lock()
	defer g.mux.Unlock()

	for i, p := range g.players {
		if p.Name == newPlayer.Name {
			g.players[i] = newPlayer
			break
		}
	}
}

func (g *Game) GetPlayers() []Player {
	g.mux.Lock()
	defer g.mux.Unlock()

	return g.players[:]
}

func (g *Game) GetState() State {
	g.mux.Lock()
	defer g.mux.Unlock()

	return g.state
}

func (g *Game) SetState(state State) {
	g.mux.Lock()
	defer g.mux.Unlock()

	g.state = state
}

func (g *Game) GetCountdown() time.Duration {
	g.mux.Lock()
	defer g.mux.Unlock()

	return g.countdown
}

func (g *Game) SetCountdown(duration time.Duration) {
	g.mux.Lock()
	defer g.mux.Unlock()

	g.countdown = duration
}

func (g *Game) DecreaseCountdown(duration time.Duration) {
	g.mux.Lock()
	defer g.mux.Unlock()

	g.countdown -= duration
}
