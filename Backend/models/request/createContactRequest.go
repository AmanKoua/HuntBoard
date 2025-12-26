package request

type CreateContactRequest struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email" validate:"email"`
	PhoneNum    string `json:"phoneNum"`
	Description string `json:"description"`
}
