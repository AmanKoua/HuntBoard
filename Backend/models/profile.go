package models

type Profile struct {
	Id        int64  `json:"id" gorm:"primaryKey"`
	FirstName string `json:"firstName" gorm:"not null;size:25"`
	LastName  string `json:"lastName" gorm:"not null;size:25"`
	Email     string `json:"email" gorm:"not null; size25"`
}

func GetMockProfileData() []Profile {

	return []Profile{

		Profile{
			Id:        1,
			FirstName: "test",
			LastName:  "user",
			Email:     "testUser@gmail.com",
		},
		Profile{
			Id:        2,
			FirstName: "aman",
			LastName:  "koua",
			Email:     "amanemail@gmail.com",
		},
	}

}
