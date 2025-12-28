import { jobStatusDictReversed, type JobListing } from "../../utils/types"
import "./JobListingCard.scss"

export interface IJobListingCard {
    isSelected: boolean;
    jobListing: JobListing;
    setSelectedJobListing: (val: JobListing) => void;
}

const getProgressString = (jobListing: JobListing): string => {

    if (!jobListing.numInterviews) {
        return "N/A"
    }

    return `${jobListing.numInterviewsCompleted} / ${jobListing.numInterviews}`

}

const getStatusModifier = (jobListing: JobListing): string => {
    return `listing-card__secondary-info--${jobStatusDictReversed[jobListing.status as keyof typeof jobStatusDictReversed]}`
}

const getListingCardModifier = (isSelected: boolean) => {
    return `listing-card ${isSelected ? 'listing-card--selected' : ''}`
}

export const JobListingCard = ({ isSelected, jobListing, setSelectedJobListing }: IJobListingCard) => {

    return <div className={getListingCardModifier(isSelected)} onClick={()=>{
        setSelectedJobListing(jobListing)
    }}>
        <div className='listing-card__primary-info'>
            <p className='item'>
                <strong>Company: </strong> {jobListing.company}
            </p>    
            <p className='item'>
                <strong>Level: </strong> {jobListing.level}
            </p>   
            <p className='item'>
                <strong>Salary: </strong> ${jobListing.salary}
            </p>   
        </div> 
        <div className='listing-card__secondary-info'>
            <p className='item'>
                <strong>Location: </strong> {jobListing.locationType}
            </p>    
            <p className='item'>
                <strong>Progress: </strong> {getProgressString(jobListing)}
            </p>   
            <p className={`item ${getStatusModifier(jobListing)}`}>
                <strong>Status: </strong> {jobListing.status}
            </p>   
        </div> 
    </div>

}