
import type { SetState } from "../../utils/types";

import "./SelectorRow.scss"

export interface ISelectorRow {
    options: string[];
    value: string;
    setValue: SetState<string>;
}

const generateRowItems = (value: string, options: string[], setValue: SetState<string>) => {

    const getButtonClassName = (option: string): string=> {
        return `selector-row__item ${option === value ? 'selected' : ''}`
    }

    return options.map((option, idx) => <button className={getButtonClassName(option)} key={idx} onClick={()=>{
        setValue(option)
    }}>
        {option}
    </button>)
}

export const SelectorRow = ({value, setValue, options}: ISelectorRow) => {
    return <div className="selector-row">
        {generateRowItems(value, options, setValue)}
    </div>
}