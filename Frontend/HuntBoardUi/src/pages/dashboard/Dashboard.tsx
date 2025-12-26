import { useContext, useEffect } from "react"
import { JobListingCard } from "../../components/jobListingCard/JobListingCard"
import "./Dashboard.scss"
import { AppContext } from "../../context/appContext"
import { getJobListings } from "../../services/axiosService"
import { panic } from "../../utils/helpers"

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

    return <main>
        <section className="listings-section">
            <h2>Job Listings</h2>
            <div className="listings-section__drawer">
                <JobListingCard/>
                <JobListingCard/>
                <JobListingCard/>
            </div>
        </section>
    </main>

}