package entity

type Profile struct {
	Id        int64  `json:"id" gorm:"primaryKey"`
	FirstName string `json:"firstName" gorm:"not null;size:25"`
	LastName  string `json:"lastName" gorm:"not null;size:25"`
	Email     string `json:"email" gorm:"not null; size25"`
}
