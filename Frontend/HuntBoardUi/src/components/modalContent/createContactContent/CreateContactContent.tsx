
import { contactTypeDict, type JobListing } from "../../../utils/types"
import { useState, useContext } from "react"
import "./CreateContactContent.scss"
import { SelectorRow } from "../../selectorRow/SelectorRow";
import { getChangeHandler, sanitizePhoneNumber } from "../../../utils/helpers";
import { AppContext } from "../../../context/appContext";
import { attachContactToListing, createContact } from "../../../services/axiosService";

export interface ICreateContactContent {
    jobListing: JobListing
    closeModalHandler: () => void;
}

export const CreateContactContent = ({ jobListing, closeModalHandler }: ICreateContactContent) => {

    const { setIsAlertBannerOpen, setAlertBannerData, setContacts } = useContext(AppContext)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [description, setDescription] = useState("")
    const [contactType, setContactType] = useState("")

    const createContactHandler = () => {

        const request = {
            firstName,
            lastName,
            email,
            phoneNum: phoneNumber,
            type: contactType,
            description
        }

        let hasAttached = false;

        createContact(request)
            .then((contact) => {

                attachContactToListing(contact.id, jobListing.id).then(() => {
                    setAlertBannerData({
                        message: "Job contact created and attached successfully!",
                        type: "info"
                    })
                    setIsAlertBannerOpen(true)
                    hasAttached = true
                }).catch(() => {
                    setAlertBannerData({
                        message: "Job contact created but NOT attached successfully!",
                        type: "alert"
                    })
                    setIsAlertBannerOpen(true)
                }).finally(() => {
                    const tempContact = hasAttached ? {...contact, jobListingId: jobListing.id} : contact
                    setContacts(contacts => [...contacts, tempContact])
                    closeModalHandler()
                })

            })
            .catch(() => {
                setAlertBannerData({
                    message: "Job contact creation failed!",
                    type: "alert"
                })
                setIsAlertBannerOpen(true)
            })
            .finally(() => {
                closeModalHandler()
            })

    }

    const contactTypeOptions = Object.keys(contactTypeDict)

    return <div className='modal-content'>

        <div className='modal-content__input-row'>
            <p>
                <strong>First Name : </strong>
            </p>
            <input onChange={getChangeHandler(setFirstName)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Last Name : </strong>
            </p>
            <input onChange={getChangeHandler(setLastName)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Email : </strong>
            </p>
            <input onChange={getChangeHandler(setEmail)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Phone Number : </strong>
            </p>
            <input value={phoneNumber} onChange={getChangeHandler(setPhoneNumber, sanitizePhoneNumber)} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Contact Type : </strong>
            </p>
            <SelectorRow value={contactType} setValue={setContactType} options={contactTypeOptions} />
        </div>

        <div className='modal-content__input-row'>
            <p>
                <strong>Description : </strong>
            </p>
            <input onChange={getChangeHandler(setDescription)} />
        </div>

        <button className='modal-content__button' onClick={createContactHandler}>Create Job Contact</button>

    </div>
}