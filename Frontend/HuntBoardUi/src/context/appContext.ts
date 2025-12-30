import { createContext } from "react";
import type { JobListing, SetState, AlertBannerData, Contact } from "../utils/types";

export interface IAppContext {
    jobListings: JobListing[]
    setJobListings: SetState<JobListing[]>
    contacts: Contact[]
    setContacts: SetState<Contact[]>
    isAlertBannerOpen: boolean
    setIsAlertBannerOpen: SetState<boolean>
    alertBannerData: AlertBannerData
    setAlertBannerData: SetState<AlertBannerData>
}

export const AppContext = createContext({} as IAppContext)