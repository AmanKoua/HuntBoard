import { createContext } from "react";
import type { JobListing, SetState } from "../utils/types";

export interface IAppContext {
    jobListings: JobListing[]
    setJobListings: SetState<JobListing[]>
}

export const AppContext = createContext({} as IAppContext)