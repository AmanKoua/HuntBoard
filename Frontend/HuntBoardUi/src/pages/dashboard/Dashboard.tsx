import { JobListingCard } from "../../components/jobListingCard/JobListingCard"
import "./Dashboard.scss"

export const Dashboard = () => {

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