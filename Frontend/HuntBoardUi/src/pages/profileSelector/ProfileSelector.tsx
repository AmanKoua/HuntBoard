import "./ProfileSelector.scss";
import {type Profile, ProfileCard} from "../../components/profileCard/profileCard.tsx";
import {useEffect, useState} from "react";
import {createProfile, getProfiles} from "../../services/axiosService.ts";
import {ProfileCreationCard} from "../../components/profileCreationCard/profileCreationCard.tsx";

export const ProfileSelector = () => {

        const [profiles, setProfiles] = useState<Profile[]>([])
        const [isSelectingProfile, setIsSelectingProfile] = useState(true);
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [email, setEmail] = useState('')

        const toggleSelectingProfile = ()=>{
                setIsSelectingProfile((val) => !val)
        }

        const sendProfileCreationRequest = async () => {

                if (!isSelectingProfile) {
                        await createProfile({
                                firstName,
                                lastName,
                                email
                        })
                        getProfiles().then((data)=>{
                                setProfiles(data)
                        })
                }

                toggleSelectingProfile()
        }

        useEffect(() => {
                getProfiles().then((data)=>{
                        setProfiles(data)
                })
        }, []);

        return <main>
                <h1>{isSelectingProfile ? 'Select Profile' : 'Create Profile'}</h1>
                {isSelectingProfile ? <ProfileCard profiles={profiles}/> : <ProfileCreationCard firstName={firstName} lastName={lastName} email={email} setEmail={setEmail} setLastName={setLastName} setFirstName={setFirstName}/>}
                <div className={'button-group'}>
                        <button className={"button"} onClick={sendProfileCreationRequest}>
                                Create Profile
                        </button>

                        {!isSelectingProfile && <button className={'button'} onClick={toggleSelectingProfile}>Cancel</button>}
                </div>

        </main>
}