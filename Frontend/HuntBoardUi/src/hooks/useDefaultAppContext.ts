import { useState } from "react"
import type { JobListing, AlertBannerData } from "../utils/types"

export const useDefaultAppContext = () => {

    const [jobListings, setJobListings] = useState<JobListing[]>([])
    const [isAlertBannerOpen, setIsAlertBannerOpen] = useState(false)
    const [alertBannerData, setAlertBannerData] = useState<AlertBannerData>({message:"", type:"alert"})

    return {
        jobListings,
        setJobListings,
        isAlertBannerOpen,
        setIsAlertBannerOpen,
        alertBannerData,
        setAlertBannerData
    }

}