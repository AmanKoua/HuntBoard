package jobListing

import (
	"github.com/AmanKoua/huntboard/middleware"
	"github.com/AmanKoua/huntboard/models/entity"
	"github.com/AmanKoua/huntboard/models/request"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type JobListingController struct {
	dbService *db.Service
	validator *validator.Validate
}

func NewController(db *db.Service) *JobListingController {
	validate := validator.New()
	return &JobListingController{db, validate}
}

func (this *JobListingController) Register(app *fiber.App) {
	jobListing := app.Group("/job-listing")

	jobListing.Use(this.verifyProfileWrapper)

	jobListing.Get("/", this.getJobListing)
	jobListing.Post("/create", this.createJobListing)

}

func (this *JobListingController) verifyProfileWrapper(c *fiber.Ctx) error {
	return middleware.VerifyProfile(c, this.dbService)
}

func (this *JobListingController) getJobListing(c *fiber.Ctx) error {

	result := []entity.JobListing{}
	profile := c.Locals("profile").(entity.Profile)

	tx := this.dbService.Db.Find(&result, "profile_id = ?", profile.Id)

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to retrieve job listings!",
		})
	}

	return c.Status(fiber.StatusOK).JSON(result)

}

func (this *JobListingController) createJobListing(c *fiber.Ctx) error {

	profile := c.Locals("profile").(entity.Profile)

	jobListing := entity.JobListing{}
	createJobListingRequest := request.CreateJobListingRequest{}

	if err := c.BodyParser(&createJobListingRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "could not parse job listing creation request",
		})
	}

	err := this.validator.Struct(createJobListingRequest)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "job creation request body failed validation!",
		})
	}

	jobListing.ProfileId = profile.Id
	jobListing.Company = createJobListingRequest.Company
	jobListing.LocationType = createJobListingRequest.LocationType
	jobListing.Link = createJobListingRequest.Link
	jobListing.PostingDate = createJobListingRequest.PostingDate
	jobListing.NumInterviews = createJobListingRequest.NumInterviews
	jobListing.NumInterviewsCompleted = createJobListingRequest.NumInterviewsCompleted
	jobListing.Salary = createJobListingRequest.Salary
	jobListing.Status = createJobListingRequest.Status

	tx := this.dbService.Db.Save(&jobListing)

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to persist job listing",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "job listing created successfully",
	})

}
