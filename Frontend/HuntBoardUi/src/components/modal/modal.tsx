
import type { JSX } from "react"
import "./Modal.scss"

export interface IModal {
    closeHandler: () => void;
    title: string;
    isOpen: boolean;
    children: JSX.Element;
}

export const Modal = ({ isOpen, title, children, closeHandler }: IModal) => {

    return <dialog open={isOpen}>
        <div className='button-container'>
            <button className='button-container__close-button' onClick={closeHandler}>
                X
            </button>
        </div>
        <div className='header'>
            <h2>
                {title}
            </h2>
        </div>
        {children}
    </dialog>

}