package ws

import (
	"encoding/json"
)

// Message is a basic websocket message
type Message struct {
	Type string          `json:"type"`
	Item json.RawMessage `json:"item"`
}
