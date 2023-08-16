package ws

import (
	"encoding/json"
)

// Message is a basic websocket message
type Message struct {
	Type string          `json:"type"`
	Item json.RawMessage `json:"item"`
}

func NewMessage(t string, item interface{}) Message {
	b, err := json.Marshal(item)
	if err != nil {
		panic(err)
	}

	return Message{
		Type: t,
		Item: b,
	}
}
