import "./profileCard.scss"
import type { Profile } from "../../utils/types";


interface IProfileCard  {
    profiles: Profile[]
    selectProfile : (val: Profile) => void;
}

export const ProfileCard = ({profiles, selectProfile}: IProfileCard) => {

    // TODO : usememo?
    const generateProfiles = () => {
        return profiles.map((profile, index) => <button className={"profile-card__entry"} key={index} onClick={() => {
            selectProfile(profile)
        }}>
            <p>
                {profile.firstName} {profile.lastName}
            </p>
        </button>)
    }

    return <section className={"profile-card"}>
        {generateProfiles()}
    </section>

}