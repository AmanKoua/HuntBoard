
import type { JSX } from "react"
import "./Modal.scss"

export interface IModal {
    title: string;
    isOpen: boolean;
    children: JSX.Element;
}

export const Modal = ({ isOpen, title, children }: IModal) => {

    return <dialog open={isOpen}>
        <button className='header__close-button'>
            X
        </button>
        <div className='header'>
            <h2>
                {title}
            </h2>
        </div>
        {children}
    </dialog>

}