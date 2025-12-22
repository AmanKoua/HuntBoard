package request

type CreateProfileRequest struct {
	FirstName string `json:"firstName" validate:"required,gte=5"`
	LastName  string `json:"lastName" validate:"required,gte=5"`
	Email     string `json:"email" validate:"required,gte=5,email"`
}
