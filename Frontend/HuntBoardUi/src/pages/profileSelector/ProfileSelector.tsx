import "./ProfileSelector.scss";
import {type Profile, ProfileCard} from "../../components/profileCard/profileCard.tsx";
import {useEffect, useState} from "react";
import {getProfiles} from "../../services/axiosService.ts";

export const ProfileSelector = () => {

        const [profiles, setProfiles] = useState<Profile[]>([])

        useEffect(() => {
                getProfiles().then((data)=>{
                        setProfiles(data)
                })
        }, []);


        return <main>
                <h1>Select Profile</h1>
                <ProfileCard profiles={profiles}/>
        </main>
}