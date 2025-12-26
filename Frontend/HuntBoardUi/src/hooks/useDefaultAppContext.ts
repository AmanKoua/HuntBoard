import { useState } from "react"
import type { JobListing } from "../utils/types"

export const useDefaultAppContext = () => {

    const [jobListings, setJobListings] = useState<JobListing[]>([])

    return {
        jobListings,
        setJobListings
    }

}