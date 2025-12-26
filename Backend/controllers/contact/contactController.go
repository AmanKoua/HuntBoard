package contact

import (
	"strconv"

	"github.com/AmanKoua/huntboard/middleware"
	"github.com/AmanKoua/huntboard/models/entity"
	"github.com/AmanKoua/huntboard/models/request"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type ContactController struct {
	dbService *db.Service
	validator *validator.Validate
}

func NewController(db *db.Service) *ContactController {
	validator := validator.New()
	return &ContactController{db, validator}
}

func (this *ContactController) Register(app *fiber.App) {
	contact := app.Group("/contact")
	contact.Use(this.verifyProfileWrapper)

	contact.Get("/", this.getContacts)
	contact.Post("/", this.createContact)
	contact.Put("/", this.attachJobListing)

}

func (this *ContactController) verifyProfileWrapper(c *fiber.Ctx) error {
	return middleware.VerifyProfile(c, this.dbService)
}

func (this *ContactController) getContacts(c *fiber.Ctx) error {

	profile := c.Locals("profile").(entity.Profile)
	contacts := []entity.Contact{}

	if tx := this.dbService.Db.Find(&contacts, "profile_id = ?", profile.Id); tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to retrieve contacts",
		})
	}

	return c.Status(fiber.StatusOK).JSON(contacts)

}

func (this *ContactController) createContact(c *fiber.Ctx) error {

	profile := c.Locals("profile").(entity.Profile)
	createContactRequest := request.CreateContactRequest{}

	if err := c.BodyParser(&createContactRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "failed parsing contact creation request",
		})
	}

	if err := this.validator.Struct(createContactRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "failed parsing contact creation request",
		})
	}

	contact := entity.Contact{
		ProfileId:    profile.Id,
		JobListingId: -1,
		FirstName:    createContactRequest.FirstName,
		LastName:     createContactRequest.LastName,
		Email:        createContactRequest.Email,
		PhoneNum:     createContactRequest.PhoneNum,
		Type:         createContactRequest.Type,
		Description:  createContactRequest.Description,
	}

	tx := this.dbService.Db.Save(&contact)

	if tx.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to persist new contact",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "successfully created contact",
	})

}

func (this *ContactController) attachJobListing(c *fiber.Ctx) error {

	contactIdParam, jobListingidParam := c.Query("contactId"), c.Query("jobListingId")

	if len(contactIdParam) == 0 || len(jobListingidParam) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "contactId or jobListingId were unexpecteldy empty",
		})
	}

	contactId, err1 := strconv.Atoi(contactIdParam)
	jobListingId, err2 := strconv.Atoi(jobListingidParam)

	if err1 != nil || err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "contactId or jobListingId could not be converted to integers",
		})
	}

	contact := entity.Contact{}
	jobListing := entity.JobListing{}

	tx := this.dbService.Db.Find(&contact, "id = ?", int64(contactId))

	if tx.Error != nil || tx.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "unable to find contact with provided id",
		})
	}

	tx = this.dbService.Db.Find(&jobListing, "id = ?", int64(jobListingId))

	if tx.Error != nil || tx.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "unable to find job listing with provided id",
		})
	}

	contact.JobListingId = int64(jobListingId)
	tx = this.dbService.Db.Save(&contact)

	if tx.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "unable to update contact",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "successfully updated",
	})

}
