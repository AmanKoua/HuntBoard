import { SelectorRow } from "../selectorRow/SelectorRow"
import { useState, useContext } from "react"
import "./CreateJobListingContent.scss"
import { jobLevelDict, jobLocationDict, jobStatusDictReversed } from "../../utils/types"
import { createJobListing } from "../../services/axiosService"
import { AppContext } from "../../context/appContext"

export interface ICreateJobListingContent {
    closeModalhandler: () => void;
}

export const CreateJobListingContent = ({closeModalhandler}: ICreateJobListingContent) => {

    const jobLocationOptions = Object.keys(jobLocationDict)
    const jobStatusOptions = Object.keys(jobStatusDictReversed)
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

    const {setIsAlertBannerOpen,setAlertBannerData} = useContext(AppContext)

    const getChangeHandler = (setterFunc: (val: string) => void) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setterFunc(e.target.value)
        }
    }

    const crateJobListingHandler = () => {
        // TODO : input sanitization?

        const requestBody = {
            company: company,
            locationType: location,
            link: link,
            postingDate: postingDate,
            numInterviews: Number(interviews),
            numInterviewsCompleted: Number(interviewsCompleted),
            level: jobLevel,
            salary: Number(salary),
            status: status
        }

        createJobListing(requestBody).then(() => {

            setAlertBannerData({
                message: "Job listing created successfully!",
                type: "info"
            })
            setIsAlertBannerOpen(true)


        }).catch((e) => {

            setAlertBannerData({
                message: "Job listing creation failed : " + e,
                type: "alert"
            })
            setIsAlertBannerOpen(true)

        }).finally(() => {
            closeModalhandler()
        })

    }

    return <div className='modal-content'>
        <div className='modal-content__input-row'>
            <p>
                <strong>Company : </strong>
            </p>
            <input onChange={getChangeHandler(setCompany)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Location : </strong>
            </p>
            <SelectorRow value={location} setValue={setLocation} options={jobLocationOptions} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Link : </strong>
            </p>
            <input onChange={getChangeHandler(setLink)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Posting Date : </strong>
            </p>
            <input onChange={getChangeHandler(setPostingDate)} placeholder="MM/DD/YYYY" />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Interviews : </strong>
            </p>
            <input onChange={getChangeHandler(setInterviews)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Interviews Completed : </strong>
            </p>
            <input onChange={getChangeHandler(setInterviewsCompleted)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Job level : </strong>
            </p>
            <SelectorRow value={jobLevel} setValue={setJobLevel} options={jobLevelOptions} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Salary : </strong>
            </p>
            <input onChange={getChangeHandler(setSalary)} placeholder="100,000" />
        </div>


        <div className='modal-content__input-row'>
            <p>
                <strong>Status : </strong>
            </p>
            <SelectorRow value={status} setValue={setStatus} options={jobStatusOptions} />
        </div>

        <button className='modal-content__button' onClick={() => { crateJobListingHandler() }}>Create Job Listing</button>

    </div>
}