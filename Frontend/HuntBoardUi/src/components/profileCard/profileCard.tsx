import "./profileCard.scss"

interface Profile {
    name: string
}

interface IProfileCard  {
    profiles: Profile[]
}

export const ProfileCard = ({profiles}: IProfileCard) => {


    // TODO : usememo?
    const generateProfiles = () => {
        return profiles.map(profile => <div className={"profile-card__entry"}>
            <p>
                {profile.name}
            </p>
        </div>)
    }

    return <section className={"profile-card"}>
        {generateProfiles()}
    </section>

}