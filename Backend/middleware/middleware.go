package middleware

import (
	"github.com/AmanKoua/huntboard/models/entity"
	"github.com/AmanKoua/huntboard/services/db"
	"github.com/gofiber/fiber/v2"
)

func VerifyProfile(c *fiber.Ctx, dbService *db.Service) error {
	profileId := c.Get("profileId")

	if len(profileId) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "profileId header was unexpectedly missing or malformed",
		})
	}

	profile := entity.Profile{}
	tx := dbService.Db.Find(&profile, "id = ?", profileId)

	if tx.Error != nil || tx.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "could not find profile with ID: " + profileId,
		})
	}

	c.Locals("profile", profile)
	return c.Next()

}
