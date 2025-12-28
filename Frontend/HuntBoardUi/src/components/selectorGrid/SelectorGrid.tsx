import type { SetState } from "../../utils/types";
import { useEffect, useState } from "react";
import "./SelectorGrid.scss"
import { panic } from "../../utils/helpers";
import { SelectorRow } from "../selectorRow/SelectorRow";

export interface ISelectorGrid {

    maxRowLen: number;
    options: string[];
    value: string;
    setValue: SetState<string>;

}

const generateSelectorRows = (partitionedData: string[][], value: string, setValue: SetState<string> ) => {
    return partitionedData.map((parition, i) => (<SelectorRow value={value} setValue={setValue} options={parition} key={i}/>)) 
}

export const SelectorGrid = ({maxRowLen, options, value, setValue}: ISelectorGrid) => {


    const [partitionedData, setPartitionedData] = useState<string[][]>([])

    useEffect(()=>{

        if (maxRowLen < 2) {
            maxRowLen = 1;
            panic("cannot have a selector grid with a max length less than 2!")
        }

        let result = [];
        let i = 0;

        for (;;) {

            const temp = options.slice(i, i+maxRowLen)
            result.push(temp)

            i += maxRowLen

            if (i >= options.length) {
                break
            }

        }

        setPartitionedData(result)

    },[])

    return <div className='selector-grid'>
        {generateSelectorRows(partitionedData, value, setValue)}
    </div>
}