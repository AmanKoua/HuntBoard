import { getContacts } from "../services/axiosService"
import { useContext, useEffect} from "react"
import { AppContext } from "../context/appContext"

export const useFetchContacts = () => {

    const { setContacts, setAlertBannerData, setIsAlertBannerOpen } = useContext(AppContext)

    useEffect(() => {

        getContacts()
            .then(data => {
                setContacts(data)
            }).catch(() => {
                setAlertBannerData({ message: "failed to retrieve contacts!", type: "alert" })
                setIsAlertBannerOpen(true);
            })
            
    }, [])


}