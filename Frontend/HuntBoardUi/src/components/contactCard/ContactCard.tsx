import { formatPhoneNum } from "../../utils/helpers";
import type { Contact } from "../../utils/types"
import "./ContactCard.scss"

export interface IContactCard {
    contact: Contact;
}

export const ContactCard = ({contact}: IContactCard) => {
    return <div className='contact-card'>
        <div className='contact-card__info-row'>
            <p><strong>Phone # : </strong>{formatPhoneNum(contact.phoneNum)}</p>
        </div>
        <div className='contact-card__info-row'>
            <p><strong>Email: </strong>{contact.email}</p>
        </div>
        <div className='contact-card__info-row'>
            <p><strong>Type : </strong>{contact.type}</p>
        </div>
        <div className='contact-card__info-row'>
            <p><strong>Description : </strong>{contact.description}</p>
        </div>
    </div>
}