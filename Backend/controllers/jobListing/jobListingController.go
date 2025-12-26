package jobListing

import (
	"strconv"

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
	jobListing.Post("/skills", this.attachJobSkills)
	jobListing.Get("/skills/:jobListingId", this.getJobSkills)

	jobListing.Post("/notes", this.attachJobNotes)
	jobListing.Get("/notes", this.getJobListingNotes)

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

	jobListing := entity.JobListing{
		ProfileId:              profile.Id,
		Company:                createJobListingRequest.Company,
		LocationType:           createJobListingRequest.LocationType,
		Link:                   createJobListingRequest.Link,
		PostingDate:            createJobListingRequest.PostingDate,
		NumInterviews:          createJobListingRequest.NumInterviews,
		NumInterviewsCompleted: createJobListingRequest.NumInterviewsCompleted,
		Level:                  createJobListingRequest.Level,
		Salary:                 createJobListingRequest.Salary,
		Status:                 createJobListingRequest.Status,
	}

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

func (this *JobListingController) attachJobSkills(c *fiber.Ctx) error {

	attachJobSkillsRequest := request.AttachJobSkillsRequest{}

	if err := c.BodyParser(&attachJobSkillsRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "could not parse job skills attachment request",
		})
	}

	err := this.validator.Struct(attachJobSkillsRequest)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "job skills attachment request body failed validation!",
		})
	}

	jobListing := entity.JobListing{}

	tx := this.dbService.Db.Find(&jobListing, "id = ?", attachJobSkillsRequest.JobListingId)

	if tx.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "no job listing found, for provided id",
		})
	}

	for _, skill := range attachJobSkillsRequest.Skills {

		jobSkill := entity.JobSkill{
			JobListingId: attachJobSkillsRequest.JobListingId,
			Name:         skill,
		}

		tx := this.dbService.Db.Save(&jobSkill)

		if tx.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "could not persist job skill!",
			})
		}

	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "successfully attached job skills",
	})

}

func (this *JobListingController) getJobSkills(c *fiber.Ctx) error {

	jobListingParam := c.Params("jobListingId")
	jobListingId, err := strconv.Atoi(jobListingParam)

	if len(jobListingParam) == 0 || err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "jobListingId path variable was malformed",
		})
	}

	jobListing := entity.JobListing{}
	tx := this.dbService.Db.Find(&jobListing, "id = ?", int64(jobListingId))

	if tx.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "no job listing found, for provided id",
		})
	}

	jobSkills := []entity.JobSkill{}
	tx = this.dbService.Db.Find(&jobSkills, "job_listing_id = ?", int64(jobListingId))

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "could not retrieve job skills",
		})
	}

	return c.Status(fiber.StatusOK).JSON(jobSkills)

}

func (this *JobListingController) attachJobNotes(c *fiber.Ctx) error {
	attachNoteRequest := request.AttachNoteRequest{}
	jobListing := entity.JobListing{}

	if err := c.BodyParser(&attachNoteRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "unable to parse note attachment request",
		})
	}

	if err := this.validator.Struct(attachNoteRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "note attachment request failed validations",
		})
	}

	tx := this.dbService.Db.Find(&jobListing, "id = ?", attachNoteRequest.JobListingId)

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "unable to retrieve job listing",
		})
	}

	if tx.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "unable to find job lsiting with provided id",
		})
	}

	note := entity.Note{
		JobListingId: attachNoteRequest.JobListingId,
		Content:      attachNoteRequest.Content,
	}

	tx = this.dbService.Db.Save(&note)

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "unable to persist job listing note",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "successfully added job listing note",
	})

}

func (this *JobListingController) getJobListingNotes(c *fiber.Ctx) error {

	jobListingIdParam := c.Query("jobListingId")

	if len(jobListingIdParam) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "jobListingId query param is missing",
		})
	}

	jobListingId, err := strconv.Atoi(jobListingIdParam)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot convert jobListingId query param to int",
		})
	}

	jobListing := entity.JobListing{}
	tx := this.dbService.Db.Find(&jobListing, "id = ?", int64(jobListingId))

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failure checking job listing existence",
		})
	}

	if tx.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "no job listing found for provided Id",
		})

	}

	notes := []entity.Note{}
	tx = this.dbService.Db.Find(&notes, "job_listing_id = ?", jobListingId)

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "unable to retieve notes for provided job listing id",
		})
	}

	return c.Status(fiber.StatusOK).JSON(notes)

}
