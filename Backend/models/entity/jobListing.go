package entity

type JobListing struct {
	Id                     int64  `json:"-" gorm:"primaryKey"`
	Company                string `json:"company" gorm:"not null; size: 255"`
	LocationType           string `json:"locationType"` // in-person, hybrid, remote
	Link                   string `json:"link" gorm:"not null"`
	PostingDate            string `json:"postingDate"`
	NumInterviews          int    `json:"numInterviews"`
	NumInterviewsCompleted int    `json:"numInterviewsCompleted"`
	Status                 string `json:"status"` // accepted, declined, rejected, ghosted, not applied, offer received
}

/*
	Contacts, Job skills, and notes will be other relations, tied to this via the Id foreign key
*/
