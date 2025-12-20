package main

import (
	"fmt"
	"github.com/AmanKoua/huntboard/controllers/profile"
	"github.com/gofiber/fiber/v2"
)

var _ = fmt.Println // TODO : remove

func main() {

	app := fiber.New()

	profileController := profile.ProfileController{}
	profileController.Register(app)

	app.Listen(":8080")
}
