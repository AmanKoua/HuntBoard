import type { Contact, JobListing, JobListingNote, SetState } from "../../utils/types"
import { SelectorGrid } from "../selectorGrid/SelectorGrid"
import { useState, useEffect, useContext, useCallback } from "react"

import "./JobListingDetails.scss"
import { CreateNotesContent } from "../modalContent/createNotesContent/CreateNotesContent"
import { getJobListingNotes } from "../../services/axiosService"
import { panic } from "../../utils/helpers"
import { Modal } from "../../components/modal/Modal"
import { CreateContactContent } from "../modalContent/createContactContent/CreateContactContent"
import { AppContext } from "../../context/appContext"
import { ContactCard } from "../contactCard/ContactCard"

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

    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [selectedContactName, setSelectedContactName] = useState("")
    const [isContactsCollapsed, setIsContactsCollapsed] = useState(true);
    const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
    const [jobListingContacts, setJobListingContacts] = useState<Contact[]>([])
    const [jobListingContactsOptions, setJobListingContactsOptions] = useState<string[]>([])

    const { contacts } = useContext(AppContext)

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

    useEffect(() => {
        const filteredContacts = contacts.filter(contact => contact.jobListingId === jobListing.id);
        const filteredContactsNames = filteredContacts.map(contact => `${contact.firstName} ${contact.lastName}`)

        setJobListingContacts(filteredContacts)
        setJobListingContactsOptions(filteredContactsNames)
    }, [contacts, jobListing])

    useEffect(() => { // collapse on component render
        setIsNotesCollapsed(true)
        setSelectedNote(null)
        setSelectedNoteName("")
        setIsNotesModalOpen(false)

        setIsContactsCollapsed(true)
        setSelectedContact(null)
        setSelectedContactName("")
        setIsContactModalOpen(false)
    }, [jobListing])

    useEffect(()=>{
        const selectedContact = contacts.filter(contact => selectedContactName.includes(contact.firstName) && selectedContactName.includes(contact.lastName))[0]
        setSelectedContact(
            selectedContact
        )
    },[selectedContactName])

    const generateSectionToggleButton = useCallback((state: boolean, setState: SetState<boolean>) => {
        return <button onClick={() => {
            setState(val => !val)
        }}>
            {state ? '+' : '-'}
        </button>
    }, [setIsNotesCollapsed, setIsContactsCollapsed, isContactsCollapsed, isNotesCollapsed])

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
                {generateSectionToggleButton(isNotesCollapsed, setIsNotesCollapsed)}
            </div>
            {!isNotesCollapsed && jobListingNoteNames.length > 0 &&
                <div className='notes-section__content'>
                    <SelectorGrid value={selectedNoteName} setValue={setSelectedNoteName} options={jobListingNoteNames} maxRowLen={4} />
                    {selectedNote && <textarea readOnly value={selectedNote.content} />}
                </div>
            }
        </div>
        <div className="contacts-section contacts-section--padded">
            <div className='contacts-section__header'>
                <h3>Contacts ({jobListingContacts.length})</h3>
                {generateSectionToggleButton(isContactsCollapsed, setIsContactsCollapsed)}
            </div>
            {!isContactsCollapsed && jobListingContacts.length > 0 &&
                <div className='contacts-section__content'>
                    <SelectorGrid value={selectedContactName} setValue={setSelectedContactName} options={jobListingContactsOptions} maxRowLen={4} />
                    {selectedContact && <ContactCard contact={selectedContact}/>}
                </div>
            }
        </div>
        <div className="button-row">
            <button className="button-row__button" onClick={() => { setIsNotesModalOpen(true) }}>Create New Note</button>
            <button className="button-row__button" onClick={() => { setIsContactModalOpen(true) }}>Create New Contact</button>
        </div>
        <Modal isOpen={isNotesModalOpen} closeHandler={closeNoteModalHandler} title="Create Note">
            <CreateNotesContent jobListing={jobListing} closeModalHandler={closeNoteModalHandler} />
        </Modal>
        <Modal isOpen={isContactModalOpen} title={"Create New Contact"} closeHandler={closeContactModalHandler}>
            <CreateContactContent closeModalHandler={closeContactModalHandler} jobListing={jobListing} />
        </Modal>
    </aside>
}