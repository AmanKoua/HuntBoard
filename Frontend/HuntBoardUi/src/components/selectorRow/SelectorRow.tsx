
import type { SetState } from "../../utils/types";

export interface ISelectorRow {
    options: string[];
    value: string;
    setValue: SetState<string>;
}

export const SelectorRow = ({value, setValue, options}: ISelectorRow) => {
    return <div className="selector-row"> lmao</div>
}