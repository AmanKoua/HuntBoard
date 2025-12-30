import axios from "axios"
import type { Profile, JobListing, IAttachNotesRequest, ICreateJobListingRequest, JobListingNote, ICreateContactRequest, Contact } from "../utils/types"
import { getLocalProfile } from "../utils/helpers"

// TODO : add zod to the equation?

export const getProfiles = async () => {
    const response = await axios.get("http://localhost:8080/profile")
    return response.data as Profile[]
}

export const createProfile = async (request: any) => {
    await axios.post("http://localhost:8080/profile/create", request)
}

export const getJobListings = async () => {

    const response = await axios.get("http://localhost:8080/job-listing", {
        headers: { profileId: getLocalProfile().id }
    })

    return response.data as JobListing[]

}

export const createJobListing = async (requestBody: ICreateJobListingRequest) => {
    await axios.post("http://localhost:8080/job-listing/create", requestBody, {
        headers: { profileId: getLocalProfile().id }
    })
}

export const attachJobListingNote = async (requestBody: IAttachNotesRequest) => {
    await axios.post("http://localhost:8080/job-listing/notes", requestBody, {
        headers: { profileId: getLocalProfile().id }
    })
}

export const getJobListingNotes = async (jobListingId: number) => {
    const response = await axios.get(`http://localhost:8080/job-listing/notes?jobListingId=${jobListingId}`, {
        headers: { profileId: getLocalProfile().id }
    })

    return response.data as JobListingNote[]
}

export const createContact = async (requestBody: ICreateContactRequest) => {
    const response = await axios.post(`http://localhost:8080/contact`, requestBody, {
        headers: { profileId: getLocalProfile().id }
    })

    return response.data as Contact
}

export const attachContactToListing = async (contactId: number, jobListingId: number) => {
    await axios.put(`http://localhost:8080/contact?contactId=${contactId}&jobListingId=${jobListingId}`, null, {
        headers: { profileId: getLocalProfile().id }
    })
}

export const getContacts = async (jobListingId?: number) => {

    const hasJobListingId = (jobListingId && jobListingId > -1)
    const url = hasJobListingId ? `http://localhost:8080/contact?jobListingId=${jobListingId}` : "http://localhost:8080/contact"

    const response = await axios.get(url, {
        headers: { profileId: getLocalProfile().id }
    })

    return response.data as Contact[]

}