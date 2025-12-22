package main

import (
	"fmt"

	"github.com/AmanKoua/huntboard/controllers/profile"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var _ = fmt.Println // TODO : remove

func main() {

	app := fiber.New()
	app.Use(cors.New())

	dbService := db.New()

	profileController := profile.NewController(dbService)
	profileController.Register(app)

	app.Listen(":8080")
}
