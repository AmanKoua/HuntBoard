import "./profileCreationCard.scss"
import {useState} from "react";

export const ProfileCreationCard = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    return <div className={'profile-creation-card'}>
        <div className={'profile-creation-card__input_group'}>
            <label>First name</label>
            <input value={firstName} onChange={(e) => {
                setFirstName(e.target.value)
            }}/>
        </div>
        <div className={'profile-creation-card__input_group'}>
            <label>Last name</label>
            <input value={lastName} onChange={(e) => {
                setLastName(e.target.value)
            }}/>
        </div>
        <div className={'profile-creation-card__input_group'}>
            <label>Email</label>
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}/>
        </div>
    </div>

}