import type { JobListing, JobListingNote } from "../../utils/types"
import { SelectorGrid } from "../selectorGrid/SelectorGrid"
import { useState, useEffect } from "react"

import "./JobListingDetails.scss"
import { CreateNotesContent } from "../modalContent/createNotesContent/CreateNotesContent"
import { getJobListingNotes } from "../../services/axiosService"
import { panic } from "../../utils/helpers"
import { Modal } from "../../components/modal/Modal"

export interface IJobListingDetails {
    jobListing: JobListing
}

export const JobListingDetails = ({ jobListing }: IJobListingDetails) => {

    const [selectedNote, setSelectedNote] = useState<JobListingNote | null>(null)
    const [selectedNoteName, setSelectedNoteName] = useState("");
    const [isNotesCollapsed, setIsNotesCollapsed] = useState(true);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
    const [jobListingNotes, setJobListingNotes] = useState<JobListingNote[]>([]);
    const [jobListingNoteNames, setJobListingNoteNames] = useState<string[]>([])
    const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

    useEffect(() => {

        getJobListingNotes(jobListing.id).then((result) => {
            setJobListingNotes(result)
            setJobListingNoteNames(result.map(note => note.name))
        }).catch((e) => {
            panic("failed to fetch job listing notes : " + e)
        })

    }, [jobListing])

    useEffect(() => {

        if (selectedNoteName === "") {
            setSelectedNote(null)
            return
        }

        for (const note of jobListingNotes) {
            if (note.name === selectedNoteName) {
                setSelectedNote(note)
            }
        }

    }, [selectedNoteName])

    useEffect(() => { // collapse on component render
        setIsNotesCollapsed(true)
        setSelectedNote(null)
        setSelectedNoteName("")
        setIsNotesModalOpen(false)
    }, [jobListing])

    const closeNoteModalHandler = () => {
        setIsNotesModalOpen(false)
    }

    const closeContactModalHandler = () => {
        setIsContactModalOpen(false)
    }

    return <aside>
        <div className='listing-header'>
            <h2>{jobListing.company}</h2>
            <p><strong>Posted : </strong> {jobListing.postingDate}</p>
        </div>
        <p>
            <strong>Link : </strong>
            <a href={jobListing.link} target="_blank" rel="noopener noreferrer">{jobListing.link}</a>
        </p>
        <div className='notes-section'>
            <div className='notes-section__header'>
                <h3>Notes ({jobListingNoteNames.length})</h3>
                <button onClick={() => {
                    setIsNotesCollapsed(val => !val)
                }}>
                    {isNotesCollapsed ? '+' : '-'}
                </button>
            </div>
            {!isNotesCollapsed && jobListingNoteNames.length > 0 &&
                <div className='notes-section__content'>
                    <SelectorGrid value={selectedNoteName} setValue={setSelectedNoteName} options={jobListingNoteNames} maxRowLen={4} />
                    {selectedNote && <textarea readOnly value={selectedNote.content} />}
                </div>
            }
        </div>
        <div className="button-row">
            <button className="button-row__button" onClick={() => { setIsNotesModalOpen(true) }}>Create New Note</button>
            <button className="button-row__button">Create New Contact</button>
        </div>
        <Modal isOpen={isNotesModalOpen} closeHandler={closeNoteModalHandler} title="Create Note">
            <CreateNotesContent jobListing={jobListing} closeModalHandler={closeNoteModalHandler} />
        </Modal>
        <Modal isOpen={isContactModalOpen} title={"Create New Contact"} closeHandler={closeContactModalHandler}>
            <div>lmao</div>
        </Modal>
    </aside>
}