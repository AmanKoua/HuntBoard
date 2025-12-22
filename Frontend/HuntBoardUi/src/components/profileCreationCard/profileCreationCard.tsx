import "./profileCreationCard.scss"
import type {SetState} from "../../utils/types.ts";

interface IProfileCreationCard {
    firstName: string;
    lastName: string;
    email: string;
    setFirstName: SetState<string>;
    setLastName: SetState<string>;
    setEmail: SetState<string>;
}

export const ProfileCreationCard = ({firstName, lastName, email, setFirstName, setLastName, setEmail}: IProfileCreationCard) => {

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