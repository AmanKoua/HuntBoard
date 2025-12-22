import "./profileCard.scss"

export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface IProfileCard  {
    profiles: Profile[]
}

export const ProfileCard = ({profiles}: IProfileCard) => {

    // TODO : usememo?
    const generateProfiles = () => {
        return profiles.map((profile, index) => <div className={"profile-card__entry"} key={index}>
            <p>
                {profile.firstName} {profile.lastName}
            </p>
        </div>)
    }

    return <section className={"profile-card"}>
        {generateProfiles()}
    </section>

}