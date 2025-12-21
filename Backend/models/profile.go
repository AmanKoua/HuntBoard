package models

type Profile struct {
	Id        int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

func GetMockProfileData() []Profile {

	return []Profile{

		Profile{
			Id:        1,
			FirstName: "test",
			LastName:  "user",
		},
		Profile{
			Id:        2,
			FirstName: "aman",
			LastName:  "koua",
		},
	}

}
