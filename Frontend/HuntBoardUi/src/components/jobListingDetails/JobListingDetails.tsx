import type { JobListing } from "../../utils/types"
import { SelectorGrid } from "../selectorGrid/SelectorGrid"
import { useState } from "react"

import "./JobListingDetails.scss"
import { Modal } from "../modal/Modal"
import { CreateNotesContent } from "../createNotesContent/CreateNotesContent"

const mockNoteNames = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5", "Note 6", "Note 7", "Note 8"]

export interface IJobListingDetails {
    jobListing: JobListing
}

export const JobListingDetails = ({ jobListing }: IJobListingDetails) => {

    const [selectedNote, setSelectedNote] = useState("")
    const [isNotesCollapsed, setIsNotesCollapsed] = useState(false);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)

    const closeNoteModalHandler = () => {
        setIsNotesModalOpen(false)
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
                <h3>Notes</h3>
                <button onClick={() => {
                    setIsNotesCollapsed(val => !val)
                }}>
                    {isNotesCollapsed ? '+' : '-'}
                </button>
            </div>
            {!isNotesCollapsed &&
                <div className='notes-section__content'>
                    <SelectorGrid value={selectedNote} setValue={setSelectedNote} options={mockNoteNames} maxRowLen={4} />
                    {selectedNote && <textarea value={"this shit is actaully really cool"} />}
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
    </aside>
}