import { useContext, useEffect } from "react"
import { JobListingCard } from "../../components/jobListingCard/JobListingCard"
import "./Dashboard.scss"
import { AppContext } from "../../context/appContext"
import { getJobListings } from "../../services/axiosService"
import { panic } from "../../utils/helpers"
import { Modal } from "../../components/modal/Modal"
import { useState } from "react"
import { CreateJobListingContent } from "../../components/createJobListingContent/CreateJobListingContent"
import { JobListingDetails } from "../../components/jobListingDetails/JobListingDetails"
import type { JobListing } from "../../utils/types"

export const Dashboard = () => {

    const [isJobListingModalOpen, setIsJobListingModalOpen] = useState<boolean>(false)
    const [selectedJobListing, setSelectedJobListing] = useState<JobListing | null>(null)

    const appContext = useContext(AppContext)
    const { jobListings, setJobListings } = appContext

    useEffect(() => {

        getJobListings()
            .then((listings) => {
                setJobListings(listings)
            })
            .catch(() => {
                panic("failed to retrieve job listings!")
            })

    }, [])

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

                <Modal isOpen={isJobListingModalOpen} title={"Create Job Listing"} closeHandler={closeModalHandler}>
                    <CreateJobListingContent closeModalhandler={closeModalHandler} />
                </Modal>
            </section>
            {selectedJobListing && <JobListingDetails jobListing={selectedJobListing} />}
        </div>
    </main>

}