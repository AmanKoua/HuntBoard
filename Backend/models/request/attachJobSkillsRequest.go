package request

type AttachJobSkillsRequest struct {
	JobListingId int64    `json:"jobListingId"`
	Skills       []string `json:"skills"`
}
