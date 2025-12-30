import { useState } from "react"
import type { JobListing, AlertBannerData, Contact } from "../utils/types"

export const useDefaultAppContext = () => {

    const [jobListings, setJobListings] = useState<JobListing[]>([])
    const [contacts, setContacts] = useState<Contact[]>([])
    const [isAlertBannerOpen, setIsAlertBannerOpen] = useState(false)
    const [alertBannerData, setAlertBannerData] = useState<AlertBannerData>({message:"", type:"alert"})

    return {
        jobListings,
        setJobListings,
        contacts,
        setContacts,
        isAlertBannerOpen,
        setIsAlertBannerOpen,
        alertBannerData,
        setAlertBannerData
    }

}