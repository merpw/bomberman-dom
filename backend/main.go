package main

import (
	"backend/handlers"
	"backend/ws"
	"flag"
	"log"
	"net"
	"net/http"
	"time"
)

func main() {
	log.SetFlags(log.Lshortfile)
	port := flag.String("port", "8080", "specify server port")

	flag.Parse()

	listen, err := net.Listen("tcp", ":"+*port)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Server started on http://localhost:%v\n", *port)

	handler := handlers.New()
	hub := ws.NewHub(handler.PrimaryHandler())
	handler.Hub = hub

	http.HandleFunc("/ws", hub.UpgradeHandler)
	http.HandleFunc("/api/status", hub.StatusHandler)

	httpServer := http.Server{
		Handler:           http.DefaultServeMux,
		ReadHeaderTimeout: 3 * time.Second,
	}

	err = httpServer.Serve(listen)
	if err != nil {
		log.Fatal(err)
	}
}
