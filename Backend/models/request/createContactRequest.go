package request

type CreateContactRequest struct {
	JobListingId int64  `json:"jobListingId"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	Email        string `json:"email"`
	PhoneNum     string `json:"phoneNum"`
	Description  string `json:"description"`
}
