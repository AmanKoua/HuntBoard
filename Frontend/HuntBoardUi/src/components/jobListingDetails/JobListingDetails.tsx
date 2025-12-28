import type { JobListing } from "../../utils/types"
import "./JobListingDetails.scss"

export interface IJobListingDetails {
    jobListing: JobListing
}

export const JobListingDetails = ({jobListing}:IJobListingDetails) => {
    return <aside>
        <div className='listing-header'>
            <h2>{jobListing.company}</h2>
            <p><strong>Posted : </strong> {jobListing.postingDate}</p>
        </div>
        <p>
            <strong>Link : </strong>
            <a href={jobListing.link} target="_blank" rel="noopener noreferrer">{jobListing.link}</a>
        </p>
    </aside>
}