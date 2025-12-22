package profile

import (
	"fmt"
	"github.com/AmanKoua/huntboard/models/profile/entity"
	"github.com/AmanKoua/huntboard/models/profile/request"
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
	profile.Post("/create", this.createProfile)
	return nil
}

func (this *ProfileController) getMockData(c *fiber.Ctx) error {
	mockData := entity.GetMockProfileData()
	return c.Status(fiber.StatusOK).JSON(mockData)
}

func (this *ProfileController) createProfile(c *fiber.Ctx) error {

	createProfileRequest := request.CreateProfileRequest{}

	if err := c.BodyParser(&createProfileRequest); err != nil {

		fmt.Println(err)

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failing parsing creation request",
		})

	}

	return nil

}
