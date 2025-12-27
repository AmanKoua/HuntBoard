import { SelectorRow } from "../selectorRow/SelectorRow"
import { useState } from "react"
import "./CreateJobListingContent.scss"
import { jobLevelDict, jobLocationDict, jobStatusDict } from "../../utils/types"

export const CreateJobListingContent = () => {

    const jobLocationOptions = Object.keys(jobLocationDict)
    const jobStatusOptions = Object.keys(jobStatusDict)
    const jobLevelOptions = Object.keys(jobLevelDict)

    const [location, setLocation] = useState("")
    const [jobLevel, setJobLevel] = useState("")
    const [status, setStatus] = useState("")

    return <div className='modal-content'>
        <div className='modal-content__input-row'>
            <p>
               <strong>Company : </strong> 
            </p>
            <input/>
        </div>

        <div className='modal-content__input-row'>
            <p>
               <strong>Location : </strong> 
            </p>
            <SelectorRow value={location} setValue={setLocation} options={jobLocationOptions}/>
        </div>

        <div className='modal-content__input-row'>
            <p>
               <strong>Link : </strong> 
            </p>
            <input/>
        </div> 

         <div className='modal-content__input-row'>
            <p>
               <strong>Posting Date : </strong> 
            </p>
            <input placeholder="MM/DD/YYYY"/>
        </div> 

        <div className='modal-content__input-row'>
            <p>
               <strong>Interviews : </strong> 
            </p>
            <input/>
        </div> 

        <div className='modal-content__input-row'>
            <p>
               <strong>Interviews Completed : </strong> 
            </p>
            <input/>
        </div> 

        <div className='modal-content__input-row'>
            <p>
               <strong>Job level : </strong> 
            </p>
            <SelectorRow value={jobLevel} setValue={setJobLevel} options={jobLevelOptions}/>
        </div> 

        <div className='modal-content__input-row'>
            <p>
               <strong>Salary : </strong> 
            </p>
            <input placeholder="100,000"/>
        </div> 


        <div className='modal-content__input-row'>
            <p>
               <strong>Status : </strong> 
            </p>
            <SelectorRow value={status} setValue={setStatus} options={jobStatusOptions}/>
        </div> 

        <button className='modal-content__button'>Create Job Listing</button>

    </div>
}