
import type { SetState } from "../../utils/types";

import "./SelectorRow.scss"

export interface ISelectorRow {
    options: string[];
    value: string;
    setValue: SetState<string>;
}

const generateRowItems = (options: string[]) => {
    return options.map(option => <button className="selector-row__item">{option}</button>)
}

export const SelectorRow = ({value, setValue, options}: ISelectorRow) => {
    return <div className="selector-row">
        {generateRowItems(options)}
    </div>
}