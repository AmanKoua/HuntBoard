import "./AlertBanner.scss"
import { AppContext } from "../../context/appContext"
import { useContext, useEffect } from "react"
import type { AlertBannerData } from "../../utils/types"

export const AlertBanner = () => {

    const getBannerModifierName = (isOpen: boolean, data: AlertBannerData) => {
        let result = ""
        result += data.type === 'alert' ? "banner--alert " : "banner--info ";
        result += isOpen ? '' : 'banner--hidden'
        return result
    }

    const {isAlertBannerOpen,setIsAlertBannerOpen,alertBannerData, setAlertBannerData} = useContext(AppContext)

    useEffect(()=>{

        if(!isAlertBannerOpen){
            return
        }

        const closeDialogTimeout = setTimeout(()=>{
            setIsAlertBannerOpen(false);
            setAlertBannerData({message:"", type:"info"})
        }, 7000);


        return () => {
            clearTimeout(closeDialogTimeout)
        }

    },[isAlertBannerOpen, alertBannerData])

    return <dialog className={`banner ${getBannerModifierName(isAlertBannerOpen, alertBannerData)}`}>
        <p>{alertBannerData.message}</p>
        <button className='banner__close-button' onClick={() => {
            setIsAlertBannerOpen(false)
        }}>X</button>
    </dialog>
}