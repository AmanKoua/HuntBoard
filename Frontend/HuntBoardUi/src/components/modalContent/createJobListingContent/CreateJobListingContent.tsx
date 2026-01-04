import { SelectorRow } from "../../selectorRow/SelectorRow"
import { useState, useContext, useEffect } from "react"
import "./CreateJobListingContent.scss"
import { jobLevelDict, jobLocationDict, jobStatusDictReversed, type JobListing, type SetState } from "../../../utils/types"
import { createJobListing, updateJobListing } from "../../../services/axiosService"
import { AppContext } from "../../../context/appContext"
import { assert, getChangeHandler } from "../../../utils/helpers"

export interface ICreateJobListingContent {
    closeModalHandler: () => void;
    selectedJobListing: JobListing | null;
    setSelectedJobListing: SetState<JobListing | null>;
    isUpdating?: boolean;
    getJobListingsWrapper: () => void;
}

export const CreateJobListingContent = ({ closeModalHandler, selectedJobListing, setSelectedJobListing, isUpdating, getJobListingsWrapper }: ICreateJobListingContent) => {

    const jobLocationOptions = Object.keys(jobLocationDict)
    const jobStatusOptions = Object.keys(jobStatusDictReversed)
    const jobLevelOptions = Object.keys(jobLevelDict)

    const [location, setLocation] = useState("")
    const [jobLevel, setJobLevel] = useState("")
    const [status, setStatus] = useState("")

    const [id, setId] = useState(-1);
    const [company, setCompany] = useState("")
    const [link, setLink] = useState("")
    const [postingDate, setPostingDate] = useState("")
    const [interviews, setInterviews] = useState("")
    const [interviewsCompleted, setInterviewsCompleted] = useState("")
    const [salary, setSalary] = useState("");

    const { setIsAlertBannerOpen, setAlertBannerData } = useContext(AppContext)

    useEffect(() => {

        if (!selectedJobListing || !isUpdating) {
            setId(-1)
            setCompany("")
            setLocation("")
            setLink("")
            setPostingDate("")
            setInterviews("")
            setInterviewsCompleted("")
            setJobLevel("")
            setSalary("")
            setStatus("")
        } else {
            setId(selectedJobListing.id)
            setCompany(selectedJobListing.company)
            setLocation(selectedJobListing.locationType)
            setLink(selectedJobListing.link)
            setPostingDate(selectedJobListing.postingDate)
            setInterviews(selectedJobListing.numInterviews.toString())
            setInterviewsCompleted(selectedJobListing.numInterviewsCompleted.toString())
            setJobLevel(selectedJobListing.level)
            setSalary(selectedJobListing.salary.toString())
            setStatus(selectedJobListing.status)
        }



    }, [selectedJobListing, isUpdating])

    const crateJobListingHandler = () => {
        // TODO : input sanitization?
        // TODO : useCallback?

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
            closeModalHandler()
            setSelectedJobListing(null)
            getJobListingsWrapper()
        })

    }

    const updateJobListingHandler = () => {

        assert(!!isUpdating && !!selectedJobListing, "expected isUpdating and selected job lsiting to both be truthy")

        const requestBody = {
            id: id,
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

        updateJobListing(requestBody).then(() => {

            setAlertBannerData({
                message: "Job listing updated successfully!",
                type: "info"
            })
            setIsAlertBannerOpen(true)


        }).catch((e) => {

            setAlertBannerData({
                message: "Job listing updating failed : " + e,
                type: "alert"
            })
            setIsAlertBannerOpen(true)

        }).finally(() => {
            closeModalHandler()
            getJobListingsWrapper();
            setSelectedJobListing(null)
        })

    }

    return <div className='modal-content'>
        <div className='modal-content__input-row'>
            <p>
                <strong>Company : </strong>
            </p>
            <input value={company} onChange={getChangeHandler(setCompany)} />
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
            <input value={link} onChange={getChangeHandler(setLink)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Posting Date : </strong>
            </p>
            <input value={postingDate} onChange={getChangeHandler(setPostingDate)} placeholder="MM/DD/YYYY" />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Interviews : </strong>
            </p>
            <input value={interviews} onChange={getChangeHandler(setInterviews)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Interviews Completed : </strong>
            </p>
            <input value={interviewsCompleted} onChange={getChangeHandler(setInterviewsCompleted)} />
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
            <input value={salary} onChange={getChangeHandler(setSalary)} placeholder="100,000" />
        </div>


        <div className='modal-content__input-row'>
            <p>
                <strong>Status : </strong>
            </p>
            <SelectorRow value={status} setValue={setStatus} options={jobStatusOptions} />
        </div>

        {
            isUpdating && isUpdating ?
                <button className='modal-content__button' onClick={() => { updateJobListingHandler() }}>Update Job Listing</button> :
                <button className='modal-content__button' onClick={() => { crateJobListingHandler() }}>Create Job Listing</button>
        }

    </div>
}