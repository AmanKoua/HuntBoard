package jobTitles

import (
	"fmt"

	"github.com/AmanKoua/huntboard/models/entity"
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
	//profile.Post("/create", this.createProfile)
}

func (this *JobTitleController) verifyProfile(c *fiber.Ctx) error {

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

//func (this *JobTitleController) attachJobTitles(c *fiber.Ctx) error {
//
//}
