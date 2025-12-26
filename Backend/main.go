package main

import (
	"github.com/AmanKoua/huntboard/controllers/contact"
	"github.com/AmanKoua/huntboard/controllers/jobListing"
	"github.com/AmanKoua/huntboard/controllers/jobTitles"
	"github.com/AmanKoua/huntboard/controllers/profile"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	app := fiber.New()
	app.Use(cors.New())

	dbService := db.New()

	profileController := profile.NewController(dbService)
	jobTitlesController := jobTitles.NewController(dbService)
	jobListingController := jobListing.NewController(dbService)
	contactController := contact.NewController(dbService)

	profileController.Register(app)
	jobTitlesController.Register(app)
	jobListingController.Register(app)
	contactController.Register(app)

	app.Listen(":8080")
}
