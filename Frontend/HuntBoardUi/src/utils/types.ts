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
    "accepted":"accepted",
    "declined":"declined",
    "rejected":"rejected",
    "interviewing":"interviewing",
    "ghosted":"ghosted",
    "not applied": "not-applied",
    "offer received": "offer-received"
}