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

    const [company, setCompany] = useState("")
    const [link, setLink] = useState("")
    const [postingDate, setPostingDate] = useState("")
    const [interviews, setInterviews] = useState("")
    const [interviewsCompleted, setInterviewsCompleted] = useState("")
    const [salary, setSalary] = useState("");

    const getChangeHandler = (setterFunc: (val: string) => void) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setterFunc(e.target.value)
        }
    }

    return <div className='modal-content'>
        <div className='modal-content__input-row'>
            <p>
               <strong>Company : </strong> 
            </p>
            <input onChange={getChangeHandler(setCompany)}/>
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
            <input onChange={getChangeHandler(setLink)}/>
        </div> 

         <div className='modal-content__input-row'>
            <p>
               <strong>Posting Date : </strong> 
            </p>
            <input  onChange={getChangeHandler(setPostingDate)} placeholder="MM/DD/YYYY"/>
        </div> 

        <div className='modal-content__input-row'>
            <p>
               <strong>Interviews : </strong> 
            </p>
            <input  onChange={getChangeHandler(setInterviews)}/>
        </div> 

        <div className='modal-content__input-row'>
            <p>
               <strong>Interviews Completed : </strong> 
            </p>
            <input  onChange={getChangeHandler(setInterviewsCompleted)}/>
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
            <input  onChange={getChangeHandler(setSalary)} placeholder="100,000"/>
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