export type SetState<T> =  React.Dispatch<React.SetStateAction<T>>

export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface JobListing {
    id: number;
    profileId: number;
    company: string;
    locationType: string;
    link: string;
    postingDate: string;
    numInterviews: number;
    numInterviewsCompleted: number;
    level: string;
    salary: string;
    status: string;
}

export const jobStatusDict = {
    "Accepted":"accepted",
    "Declined":"declined",
    "Rejected":"rejected",
    "Interviewing":"interviewing",
    "Ghosted":"ghosted",
    "Not applied": "not-applied",
    "Offer received": "offer-received"
}

export const jobLocationDict = {
    "In Person":"in-person",
    "Hybrid":"hybrid",
    "Remote":"remote"
}