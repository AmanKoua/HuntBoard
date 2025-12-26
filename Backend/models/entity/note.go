package entity

type Note struct {
	Id           int64  `json:"id" gorm:"primaryKey"`
	JobListingId int64  `json:"-" gorm:"not null"`
	Content      string `json:"content" gorm:"not null"`
}
