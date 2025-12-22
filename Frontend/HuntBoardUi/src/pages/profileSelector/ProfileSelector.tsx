import "./ProfileSelector.scss";
import {type Profile, ProfileCard} from "../../components/profileCard/profileCard.tsx";
import {useEffect, useState} from "react";
import {getProfiles} from "../../services/axiosService.ts";
import {ProfileCreationCard} from "../../components/profileCreationCard/profileCreationCard.tsx";

export const ProfileSelector = () => {

        const [profiles, setProfiles] = useState<Profile[]>([])
        const [isSelectingProfile, setIsSelectingProfile] = useState(true);

        useEffect(() => {
                getProfiles().then((data)=>{
                        setProfiles(data)
                })
        }, []);


        return <main>
                <h1>{isSelectingProfile ? 'Select Profile' : 'Create Profile'}</h1>
                {isSelectingProfile ? <ProfileCard profiles={profiles}/> : <ProfileCreationCard/>}
                <button className={"create-button"} onClick={()=>{
                        setIsSelectingProfile((val) => !val)
                }}>Create Profile</button>
        </main>
}