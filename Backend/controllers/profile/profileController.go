package profile

import (
	"github.com/AmanKoua/huntboard/models/profile/entity"
	"github.com/AmanKoua/huntboard/models/profile/request"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type ProfileController struct {
	dbService *db.Service
	validator *validator.Validate
}

func NewController(db *db.Service) *ProfileController {
	validate := validator.New()
	return &ProfileController{db, validate}
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

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failing parsing creation request",
		})

	}

	err := this.validator.Struct(createProfileRequest)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failing parsing creation request (validation failed)!",
		})
	}

	// TODO : stopped here! Find if email already exists in DB
	//this.dbService.Db.Find()

	return nil

}
