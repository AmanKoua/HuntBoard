package main

import (
	"fmt"
	"github.com/AmanKoua/huntboard/controllers/profile"
	"github.com/AmanKoua/huntboard/services/dbService"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var _ = fmt.Println // TODO : remove

func main() {

	app := fiber.New()
	app.Use(cors.New())

	dbService := dbService.New()
	//dbService.MigrateMockData() // TODO : only use once (to populate mock data)
	fmt.Println(dbService)

	profileController := profile.ProfileController{}
	profileController.Register(app)

	app.Listen(":8080")
}
