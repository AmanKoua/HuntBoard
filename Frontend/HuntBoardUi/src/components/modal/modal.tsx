
import type { JSX } from "react"

export interface IModal {
    isOpen: boolean
    children: JSX.Element
}

export const Modal = ({isOpen, children}: IModal) => {

    return <dialog open={isOpen}>
        {children}
    </dialog>

}