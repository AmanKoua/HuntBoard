import type { Contact, JobListing, JobListingNote, SetState } from "../../utils/types"
import { useState, useEffect, useContext } from "react"

import "./JobListingDetails.scss"
import { CreateNotesContent } from "../modalContent/createNotesContent/CreateNotesContent"
import { deleteJobListing, getJobListingNotes } from "../../services/axiosService"
import { panic } from "../../utils/helpers"
import { Modal } from "../../components/modal/Modal"
import { CreateContactContent } from "../modalContent/createContactContent/CreateContactContent"
import { AppContext } from "../../context/appContext"

import { NotesSection } from "../notesSection/NotesSection"
import { ContactsSection } from "../contactsSection/ContactsSections"

import deleteIcon from "../../../public/icons/delete.svg";
import editIcon from "../../../public/icons/edit.svg"

export interface IJobListingDetails {
    jobListing: JobListing;
    getJobListingsWrapper: () => void;
    setIsUpdatingJobListing: SetState<boolean>;
    toggleModalHandler: (val: boolean) => void;
    setSelectedJobListing: SetState<JobListing | null>;
}

export const JobListingDetails = ({ jobListing, getJobListingsWrapper, setIsUpdatingJobListing, toggleModalHandler, setSelectedJobListing }: IJobListingDetails) => {

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

    const { contacts, setContacts, setIsAlertBannerOpen, setAlertBannerData } = useContext(AppContext)

    const fetchJobListingNotesWrapper = () => {
        getJobListingNotes(jobListing.id).then((result) => {
            setJobListingNotes(result)
            setJobListingNoteNames(result.map(note => note.name))
        }).catch((e) => {
            panic("failed to fetch job listing notes : " + e)
        })
    }

    useEffect(() => {
        fetchJobListingNotesWrapper()
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
    }, [jobListing, jobListingNotes, contacts])

    useEffect(() => {
        const selectedContact = contacts.filter(contact => selectedContactName.includes(contact.firstName) && selectedContactName.includes(contact.lastName))[0]
        setSelectedContact(
            selectedContact
        )
    }, [selectedContactName])

    // TODO : stopped here! test deletion of job listing
    const deleteJobListingsHandler = () => {
        deleteJobListing(jobListing.id)
            .then(() => {
                setAlertBannerData({
                    message: "Job listing deleted successfully!",
                    type: "info"
                })
                setIsAlertBannerOpen(true)
                getJobListingsWrapper()
            })
            .catch(() => {
                setAlertBannerData({
                    message: "Job listing deletion failed!",
                    type: "alert"
                })
                setIsAlertBannerOpen(true)
            }).finally(()=>{
                setSelectedJobListing(null)
            })
    }

    const closeNoteModalHandler = () => {
        setIsNotesModalOpen(false)
    }

    const closeContactModalHandler = () => {
        setIsContactModalOpen(false)
    }

    const handleJobListingEdit = () => {
        setIsUpdatingJobListing(true)
        toggleModalHandler(true)
    }

    return <aside>
        <div className='listing-header'>
            <h2>{jobListing.company}</h2>
            <p><strong>Posted : </strong> {jobListing.postingDate}</p>
            <div className='listing-header__buttons-container'>
                <button onClick={deleteJobListingsHandler}>
                    <img className='icon delete' src={deleteIcon} />
                </button>
                <button onClick={handleJobListingEdit}>
                    <img className='icon edit' src={editIcon} />
                </button>
            </div>
        </div>
        <p>
            <strong>Link : </strong>
            <a href={jobListing.link} target="_blank" rel="noopener noreferrer">{jobListing.link}</a>
        </p>
        <NotesSection jobListingNoteNames={jobListingNoteNames} isNotesCollapsed={isNotesCollapsed} setIsNotesCollapsed={setIsNotesCollapsed} selectedNote={selectedNote} selectedNoteName={selectedNoteName} setSelectedNoteName={setSelectedNoteName} fetchJobListingNotesWrapper={fetchJobListingNotesWrapper} />
        <ContactsSection contacts={contacts} setContacts={setContacts} jobListingContacts={jobListingContacts} isContactsCollapsed={isContactsCollapsed} setIsContactsCollapsed={setIsContactsCollapsed} selectedContact={selectedContact} selectedContactName={selectedContactName} setSelectedContactName={setSelectedContactName} jobListingContactsOptions={jobListingContactsOptions} setJobListingContactsOptions={setJobListingContactsOptions} />
        <div className="button-row">
            <button className="button-row__button" onClick={() => { setIsNotesModalOpen(true) }}>Create New Note</button>
            <button className="button-row__button" onClick={() => { setIsContactModalOpen(true) }}>Create New Contact</button>
        </div>
        <Modal isOpen={isNotesModalOpen} closeHandler={closeNoteModalHandler} title="Create Note">
            <CreateNotesContent jobListing={jobListing} closeModalHandler={closeNoteModalHandler} noteCreationCallback={fetchJobListingNotesWrapper} />
        </Modal>
        <Modal isOpen={isContactModalOpen} title={"Create New Contact"} closeHandler={closeContactModalHandler}>
            <CreateContactContent closeModalHandler={closeContactModalHandler} jobListing={jobListing} />
        </Modal>
    </aside>
}

