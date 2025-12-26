import { useContext, useEffect } from "react"
import { JobListingCard } from "../../components/jobListingCard/JobListingCard"
import "./Dashboard.scss"
import { AppContext } from "../../context/appContext"
import { getJobListings } from "../../services/axiosService"
import { panic } from "../../utils/helpers"
import { Modal } from "../../components/modal/modal"

export const Dashboard = () => {

    const appContext = useContext(AppContext)
    const {jobListings, setJobListings} = appContext

    useEffect(()=>{

        getJobListings()
        .then((listings)=>{
            setJobListings(listings)
        })
        .catch(()=>{
            panic("failed to retrieve job listings!")
        })

    },[])

    const generateJobListingCards = () => {
        return jobListings.map( (listing, idx) => <JobListingCard jobListing={listing} key={idx}/>)
    }

    return <main>
        <section className="listings-section">
            <h2>Job Listings</h2>
            <div className="listings-section__drawer">
                {generateJobListingCards()}
            </div>
            <button className='listings-section__button'>Create Job Listing</button>
            <Modal isOpen={true} title={"Create Job Listing"}>
                <div>lmao</div>
            </Modal>
        </section>
    </main>

}