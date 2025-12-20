import "./ProfileSelector.scss";
import {ProfileCard} from "../../components/profileCard/profileCard.tsx";

export const ProfileSelector = () => {

        const profiles = [ // TODO retrieve from backend
                {
                        name: "Test User 1"
                },
                {
                        name: "Aman Koua"
                }
        ]

        return <main>
                <h1>Select Profile</h1>
                <ProfileCard profiles={profiles}/>
        </main>
}