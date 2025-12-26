package request

type CreateContactRequest struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email" validate:"email"`
	PhoneNum    string `json:"phoneNum"`
	Type        string `json:"type"` // Friend, Co-Worker, Classmate, Recruiter, Employee, Relative, Other
	Description string `json:"description"`
}
