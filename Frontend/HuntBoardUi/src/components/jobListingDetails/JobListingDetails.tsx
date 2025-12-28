import type { JobListing } from "../../utils/types"
import { SelectorRow } from "../selectorRow/SelectorRow"
import "./JobListingDetails.scss"

const mockNoteNames = ["Note 1", "Note 2", "Note 3", "Note 4"]

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
        <div className='notes-section'>
            <div className='notes-section__header'>
                <h3>Notes</h3>
            </div>
            <SelectorRow value={""} setValue={()=>{}} options={mockNoteNames}></SelectorRow>
        </div>
    </aside>
}