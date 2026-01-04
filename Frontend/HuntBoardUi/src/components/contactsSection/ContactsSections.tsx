import { assert, generateSectionToggleButton } from "../../utils/helpers"
import type { Contact, SetState } from "../../utils/types"
import { ContactCard } from "../contactCard/ContactCard";
import { SelectorGrid } from "../selectorGrid/SelectorGrid";

import deleteIcon from "../../../public/icons/delete.svg";
import editIcon from "../../../public/icons/edit.svg"
import { deleteContact } from "../../services/axiosService";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";

export interface IContactsSection {
    contacts: Contact[];
    setContacts: SetState<Contact[]>;
    jobListingContacts: Contact[];
    isContactsCollapsed: boolean;
    setIsContactsCollapsed: SetState<boolean>;
    selectedContact: Contact | null;
    selectedContactName: string;
    setSelectedContactName: SetState<string>;
    jobListingContactsOptions: string[];
    setJobListingContactsOptions: SetState<string[]>;
}

export const ContactsSection = ({contacts, setContacts, jobListingContacts, isContactsCollapsed, setIsContactsCollapsed, selectedContact, selectedContactName, setSelectedContactName, jobListingContactsOptions }: IContactsSection) => {
    const {setAlertBannerData, setIsAlertBannerOpen}  = useContext(AppContext)

    const deleteContactHandler = () => {
        assert(!!selectedContact, "expected selected contact NOT to be falsy!")

        deleteContact(selectedContact!.id).then(() => {
            setAlertBannerData({
                message: "successfully deleted contact",
                type: "info"
            })
            setIsAlertBannerOpen(true)

            const filteredContacts = contacts.filter(contact => contact.id !== selectedContact!.id)
            setContacts(filteredContacts)

        }).catch(() => {
            setAlertBannerData({
                message: "failed to delete contact",
                type: "alert"
            })
            setIsAlertBannerOpen(true)
        })
    }

    return <div className="contacts-section contacts-section--padded">
        <div className='contacts-section__header'>
            <h3>Contacts ({jobListingContacts.length})</h3>
            {generateSectionToggleButton(isContactsCollapsed, setIsContactsCollapsed)}
        </div>
        {!isContactsCollapsed && jobListingContacts.length > 0 &&
            <div className='contacts-section__content'>
                <SelectorGrid value={selectedContactName} setValue={setSelectedContactName} options={jobListingContactsOptions} maxRowLen={4} />
                {selectedContact && <ContactCard contact={selectedContact} />}
                {selectedContact &&
                    <div className='contacts-section__content__icon-row'>
                        <button onClick={deleteContactHandler}>
                            <img className='icon delete' src={deleteIcon} />
                        </button>
                        <button>
                            <img className='icon edit' src={editIcon} />
                        </button>
                    </div>
                }

            </div>
        }
    </div>

}