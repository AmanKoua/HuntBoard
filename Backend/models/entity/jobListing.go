package entity

type JobListing struct {
	Id                     int64  `json:"id" gorm:"primaryKey"`
	ProfileId              int64  `json:"profileId" gorm:"not null"`
	Company                string `json:"company" gorm:"not null; size: 255"`
	LocationType           string `json:"locationType" gorm:"not null; size: 255"` // in-person, hybrid, remote
	Link                   string `json:"link" gorm:"not null"`
	PostingDate            string `json:"postingDate"`
	NumInterviews          int    `json:"numInterviews"`
	NumInterviewsCompleted int    `json:"numInterviewsCompleted"`
	Level                  string `json:"level"` // junior, mid-senior, senior, staff, principal
	Salary                 int64  `json:"salary"`
	Status                 string `json:"status" gorm:"not null; size: 255"` // accepted, declined, rejected, interviewing, ghosted, not applied, offer received
}
