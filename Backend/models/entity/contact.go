package entity

type Contact struct {
	Id           int64  `json:"id" gorm:"primaryKey"`
	ProfileId    int64  `json:"profileId" gorm:"not null"`
	JobListingId int64  `json:"jobListingId"`
	FirstName    string `json:"firstName" gorm:"not null; size: 50"`
	LastName     string `json:"lastName" gorm:"not null; size:50"`
	Email        string `json:"email"`
	PhoneNum     string `json:"phoneNum"`
	Type         string `json:"type"` // Friend, Co-Worker, Classmate, Recruiter, Employee, Relative, Other
	Description  string `json:"description"`
}
