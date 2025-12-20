package profile

import (
	"github.com/AmanKoua/huntboard/models"
	"github.com/gofiber/fiber/v2"
)

type ProfileController struct{}

func (this *ProfileController) Register(app *fiber.App) error {

	profile := app.Group("/profile")
	profile.Get("/", this.getMockData)
	return nil

}

func (this *ProfileController) getMockData(c *fiber.Ctx) error {
	mockData := models.GetMockProfileData()
	return c.Status(fiber.StatusOK).JSON(mockData)
}
