package profile

import (
	"github.com/AmanKoua/huntboard/models/profile"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/gofiber/fiber/v2"
)

type ProfileController struct {
	dbService *db.Service
}

func NewController(db *db.Service) *ProfileController {
	return &ProfileController{db}
}

func (this *ProfileController) Register(app *fiber.App) error {
	profile := app.Group("/profile")
	profile.Get("/", this.getMockData)
	profile.Post("/create")
	return nil
}

func (this *ProfileController) getMockData(c *fiber.Ctx) error {
	mockData := profile.GetMockProfileData()
	return c.Status(fiber.StatusOK).JSON(mockData)
}

func (this *ProfileController) createProfile(c *fiber.Ctx) error {

}
