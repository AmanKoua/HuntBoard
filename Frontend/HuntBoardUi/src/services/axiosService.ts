import axios from "axios"
import type { Profile, JobListing } from "../utils/types"
import { getLocalProfile } from "../utils/helpers"

// TODO : add zod to the equation?

export const getProfiles = async ()=> {
    const response = await axios.get("http://localhost:8080/profile")
    return response.data as Profile[]
}

export const createProfile = async (request: any) => {
     await axios.post("http://localhost:8080/profile/create",request)
}

export const getJobListings = async () => {

    const response = await axios.get("http://localhost:8080/job-listing", {
        headers: {profileId: getLocalProfile().id}
    })

    return response.data as JobListing[]

}