package request

type AttachNoteRequest struct {
	JobListingId int64  `json:"jobListingId" validate:"required"`
	Content      string `json:"content" validate:"required"`
	Name         string `json:"name" validate:"required"`
}
