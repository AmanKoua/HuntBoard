package entity

type JobSkill struct {
	Id           int64  `json:"id" gorm:"primaryKey"`
	JobListingId int64  `json:"jobListingId" gorm:"not null"`
	Name         string `json:"name" gorm:"not null"`
}
