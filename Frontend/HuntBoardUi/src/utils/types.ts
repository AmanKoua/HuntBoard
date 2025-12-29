export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

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

export interface Contact {
    id: number;
    profileId: number;
    jobListingId: number;
    firstName: string;
    lastName: string;
    rmail: string;
    phoneNum: string;
    type: string;   // Friend, Co-Worker, Classmate, Recruiter, Employee, Relative, Other
    description: string;
}

export interface JobListingNote {
    id: number;
    name: string;
    content: string;
}

export interface AlertBannerData {
    message: string;
    type: 'info' | "alert";
}

export interface ICreateJobListingRequest {
    company: string;
    locationType: string;
    link: string;
    postingDate: string;
    numInterviews: number;
    numInterviewsCompleted: number;
    level: string;
    salary: number;
    status: string;
}

export interface IAttachNotesRequest {
    jobListingId: number;
    content: string;
    name: string;
}

export interface ICreateContactRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNum: string;
    type: string;
    description: string;
}

export const jobStatusDictReversed = {
    "Accepted": "accepted",
    "Declined": "declined",
    "Rejected": "rejected",
    "Interviewing": "interviewing",
    "Ghosted": "ghosted",
    "Not applied": "not-applied",
    "Offer received": "offer-received"
}


export const jobLocationDict = {
    "In Person": "in-person",
    "Hybrid": "hybrid",
    "Remote": "remote"
}

export const jobLevelDict = {
    "Junior": "junior",
    "Mid Senior": "mid-senior",
    "Senior": "senior",
    "Staff": "staff",
    "Principal": "principal"
}

export const contactTypeDict = {
    "Friend": "Friend",
    "Co-Worker": "Co-Worker",
    "Classmate": "Classmate",
    "Recruiter": "Recruiter",
    "Employee": "Employee",
    "Relative": "Relative",
    "Other": "Other"
}