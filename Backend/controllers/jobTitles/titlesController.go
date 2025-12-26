package jobTitles

import (
	"github.com/AmanKoua/huntboard/middleware"
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

	profile.Use(this.verifyProfileWrapper)
	profile.Get("/", this.getJobTitles)
	profile.Put("/create", this.attachJobTitles)
}

func (this *JobTitleController) verifyProfileWrapper(c *fiber.Ctx) error {
	return middleware.VerifyProfile(c, this.dbService)
}

func (this *JobTitleController) getJobTitles(c *fiber.Ctx) error {

	profile := c.Locals("profile").(entity.Profile)
	jobTitlesArr := []entity.JobTitle{}

	tx := this.dbService.Db.Find(&jobTitlesArr, "profile_id = ?", profile.Id)

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to retrieve job titles",
		})
	}

	return c.Status(fiber.StatusOK).JSON(jobTitlesArr)

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
