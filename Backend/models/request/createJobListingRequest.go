package request

type CreateJobListingRequest struct {
	Company                string `json:"company"`
	LocationType           string `json:"locationType"` // in-person, hybrid, remote
	Link                   string `json:"link"`
	PostingDate            string `json:"postingDate"`
	NumInterviews          int    `json:"numInterviews"`
	NumInterviewsCompleted int    `json:"numInterviewsCompleted"`
	Status                 string `json:"status" ` // accepted, declined, rejected, ghosted, not applied, offer received
}
