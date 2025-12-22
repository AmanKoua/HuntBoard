import "./ProfileSelector.scss";
import {type Profile, ProfileCard} from "../../components/profileCard/profileCard.tsx";
import {useEffect, useState} from "react";
import {getProfiles} from "../../services/axiosService.ts";
import {ProfileCreationCard} from "../../components/profileCreationCard/profileCreationCard.tsx";

export const ProfileSelector = () => {

        const [profiles, setProfiles] = useState<Profile[]>([])
        const [isSelectingProfile, setIsSelectingProfile] = useState(true);

        const toggleSelectingProflile = ()=>{
                setIsSelectingProfile((val) => !val)
        }

        const createProfile = () => {

                if (!isSelectingProfile) {
                        // create profile
                }

                toggleSelectingProflile()
        }

        useEffect(() => {
                getProfiles().then((data)=>{
                        setProfiles(data)
                })
        }, []);

        return <main>
                <h1>{isSelectingProfile ? 'Select Profile' : 'Create Profile'}</h1>
                {isSelectingProfile ? <ProfileCard profiles={profiles}/> : <ProfileCreationCard/>}
                <div className={'button-group'}>
                        <button className={"button"} onClick={createProfile}>
                                Create Profile
                        </button>

                        {!isSelectingProfile && <button className={'button'} onClick={toggleSelectingProflile}>Cancel</button>}
                </div>

        </main>
}