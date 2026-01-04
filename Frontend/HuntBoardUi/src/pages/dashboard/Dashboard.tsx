import { useContext, useEffect } from "react"
import { JobListingCard } from "../../components/jobListingCard/JobListingCard"
import "./Dashboard.scss"
import { AppContext } from "../../context/appContext"
import { getJobListings } from "../../services/axiosService"
import { useState } from "react"
import { CreateJobListingContent } from "../../components/modalContent/createJobListingContent/CreateJobListingContent"
import { JobListingDetails } from "../../components/jobListingDetails/JobListingDetails"
import type { JobListing } from "../../utils/types"
import { Modal } from "../../components/modal/Modal"
import { useFetchContacts } from "../../hooks/useFetchContacts"

export const Dashboard = () => {

    const [isJobListingModalOpen, setIsJobListingModalOpen] = useState<boolean>(false)
    const [selectedJobListing, setSelectedJobListing] = useState<JobListing | null>(null)
    const [isUpdatingJobListing, setIsUpdatingJobListing] = useState(false)

    const appContext = useContext(AppContext)
    const { jobListings, setJobListings, setAlertBannerData, setIsAlertBannerOpen } = appContext


    const getJobListingsWrapper = () => {
        getJobListings()
            .then((listings) => {
                setJobListings(listings)
            })
            .catch(() => {
                setAlertBannerData({ message: "failed to retrieve job listings!", type: "alert" })
                setIsAlertBannerOpen(true);
            })
    }

    useEffect(() => {
        getJobListingsWrapper()
    }, [])

    useEffect(() => {
        if (!isJobListingModalOpen) {
            setIsUpdatingJobListing(false)
        }
    }, [isJobListingModalOpen])

    useFetchContacts()

    const toggleModalHandler = (state: boolean) => {
        setIsJobListingModalOpen(state)
    }

    const closeModalHandler = () => {
        toggleModalHandler(false)
    }

    const generateJobListingCards = () => {
        return jobListings.map((listing, idx) => <JobListingCard jobListing={listing} setSelectedJobListing={setSelectedJobListing} isSelected={listing === selectedJobListing} key={idx} />)
    }

    return <main>
        <div className='container'>
            <section className="listings-section">
                <h2>Job Listings</h2>
                <div className="listings-section__drawer">
                    {generateJobListingCards()}
                </div>
                <button className='listings-section__button' onClick={() => {
                    toggleModalHandler(true)
                }}>
                    Create Job Listing
                </button>

                <Modal isOpen={isJobListingModalOpen} title={isUpdatingJobListing ? "Update Job Listing" : "Create Job Listing"} closeHandler={closeModalHandler}>
                    <CreateJobListingContent closeModalHandler={closeModalHandler} selectedJobListing={selectedJobListing} setSelectedJobListing={setSelectedJobListing} isUpdating={isUpdatingJobListing} getJobListingsWrapper={getJobListingsWrapper} />
                </Modal>
            </section>
            {selectedJobListing && <JobListingDetails jobListing={selectedJobListing} getJobListingsWrapper={getJobListingsWrapper} setIsUpdatingJobListing={setIsUpdatingJobListing} toggleModalHandler={toggleModalHandler} setSelectedJobListing={setSelectedJobListing} />}
        </div>
    </main>

}