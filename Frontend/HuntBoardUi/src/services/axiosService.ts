import axios from "axios"
import type {Profile} from "../components/profileCard/profileCard.tsx";

export const getProfiles = async ()=> {
    const response = await axios.get("http://localhost:8080/profile")
    return response.data as Profile[]
}

export const createProfile = async (request: any) => {
     await axios.post("http://localhost:8080/profile/create",request)
}