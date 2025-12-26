import "./CreateJobListingContent.scss"

export const CreateJobListingContent = () => {
    return <div className='modal-content'>
        <div className='modal-content__input-row'>
            <p>
               <strong>Company : </strong> 
            </p>
            <input/>
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
               <strong>Salary : </strong> 
            </p>
            <input placeholder="100,000"/>
        </div> 

        <button>Create Job Listing</button>

    </div>
}