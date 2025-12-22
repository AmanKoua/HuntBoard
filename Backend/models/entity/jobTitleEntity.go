package entity

type JobTitle struct {
	Id        int64  `json:"id" gorm:"primaryKey"`
	ProfileId int64  `json:"-" gorm:"not null"`
	Name      string `json:"name" gorm:"not null; size:255"`
}
