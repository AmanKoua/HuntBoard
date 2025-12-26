import type { JobListing } from "../../utils/types"
import "./JobListingCard.scss"

export interface IJobListingCard {
    jobListing: JobListing
}

const getProgressString = (jobListing: JobListing): string => {

    if (!jobListing.numInterviews) {
        return "N/A"
    }

    return `${jobListing.numInterviewsCompleted} / ${jobListing.numInterviews}`

}

export const JobListingCard = ({ jobListing }: IJobListingCard) => {

    return <div className="listing-card">
        <div className='listing-card__primary-info'>
            <p>
                <strong>Company: </strong> {jobListing.company}
            </p>    
            <p>
                <strong>Level: </strong> {jobListing.level}
            </p>   
            <p>
                <strong>Salary: </strong> ${jobListing.salary}
            </p>   
        </div> 
        <div className='listing-card__secondary-info'>
            <p>
                <strong>Location: </strong> {jobListing.locationType}
            </p>    
            <p>
                <strong>Progress: </strong> {getProgressString(jobListing)}
            </p>   
            <p>
                <strong>Status: </strong> {jobListing.status}
            </p>   
        </div> 
        </div>

}