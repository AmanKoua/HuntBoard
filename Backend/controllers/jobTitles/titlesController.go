package jobTitles

import (
	"fmt"

	"github.com/AmanKoua/huntboard/models/entity"
	"github.com/AmanKoua/huntboard/models/request"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type JobTitleController struct {
	dbService *db.Service
	validator *validator.Validate
}

func NewController(db *db.Service) *JobTitleController {
	validate := validator.New()
	return &JobTitleController{db, validate}
}

func (this *JobTitleController) Register(app *fiber.App) {
	profile := app.Group("/job-title")

	profile.Use(this.verifyProfile)
	profile.Get("/", this.getJobTitles)
	profile.Put("/create", this.attachJobTitles)
}

func (this *JobTitleController) verifyProfile(c *fiber.Ctx) error { // TODO : refactor middleware, to make it reusable

	profileId := c.Get("profileId")
	fmt.Println(profileId)

	if len(profileId) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "profileId header was unexpectedly missing or malformed",
		})
	}

	profile := entity.Profile{}
	tx := this.dbService.Db.Find(&profile, "id = ?", profileId)

	if tx.Error != nil || tx.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "could not find profile with ID: " + profileId,
		})
	}

	c.Locals("profile", profile)
	return c.Next()

}

func (this *JobTitleController) getJobTitles(c *fiber.Ctx) error {
	// TODO : impl
	return nil

}

func (this *JobTitleController) attachJobTitles(c *fiber.Ctx) error {

	profile := c.Locals("profile").(entity.Profile)
	attachJobTitlesRequest := request.AttachJobTitlesRequest{}

	if err := c.BodyParser(&attachJobTitlesRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failing parsing creation request",
		})
	}

	err := this.validator.Struct(attachJobTitlesRequest)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failing parsing job title attachment request (validation failed)!",
		})
	}

	for _, title := range attachJobTitlesRequest.Titles {

		newJobTitle := entity.JobTitle{Name: title, ProfileId: profile.Id}
		tx := this.dbService.Db.Create(&newJobTitle)

		if tx.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to persist new job title",
			})
		}

	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "success",
	})

}
