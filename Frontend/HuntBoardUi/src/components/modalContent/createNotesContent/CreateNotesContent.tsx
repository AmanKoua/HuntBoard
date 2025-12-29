import { useState, useContext } from "react"
import "./CreateNotesContent.scss"
import { attachJobListingNote } from "../../../services/axiosService"
import type { JobListing } from "../../../utils/types"
import { AppContext } from "../../../context/appContext"


export interface ICreateNotesContent {
    jobListing: JobListing;
    closeModalHandler: () => void;
}

export const CreateNotesContent = ({ jobListing, closeModalHandler }: ICreateNotesContent) => {

    const [noteName, setNoteName] = useState("")
    const [noteContent, setNoteContent] = useState("")
    const { setIsAlertBannerOpen, setAlertBannerData } = useContext(AppContext)

    const createNoteHandler = () => {

        const request = {
            jobListingId: jobListing.id,
            name: noteName,
            content: noteContent
        }

        attachJobListingNote(request)
            .then(() => {
                setAlertBannerData({
                    message: "Job listing note created successfully!",
                    type: "info"
                })
                setIsAlertBannerOpen(true)
            })
            .catch(() => {
                setAlertBannerData({
                    message: "Job listing note creation failed!",
                    type: "alert"
                })
                setIsAlertBannerOpen(true)
            })
            .finally(() => {
                closeModalHandler()
            })

    }

    return <div className='modal-content'>
        <div className='modal-content__input-row'>
            <p>
                <strong>Name : </strong>
            </p>
            <input onChange={(e) => { setNoteName(e.target.value) }} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Content : </strong>
            </p>
            <textarea onChange={(e) => { setNoteContent(e.target.value) }} />
        </div>

        <button className='modal-content__button' onClick={createNoteHandler}>Create Note</button>

    </div>

}