import type { JobListingNote, SetState } from "../../utils/types"
import deleteIcon from "../../../public/icons/delete.svg";
import editIcon from "../../../public/icons/edit.svg"
import { SelectorGrid } from "../selectorGrid/SelectorGrid";
import { deleteJobListingNote } from "../../services/axiosService";
import { assert } from "../../utils/helpers";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";

const generateSectionToggleButton = (state: boolean, setState: SetState<boolean>) => {
    return <button onClick={() => {
        setState(val => !val)
    }}>
        {state ? '+' : '-'}
    </button>
}

export interface INotesSection {
    jobListingNoteNames: string[];
    isNotesCollapsed: boolean;
    setIsNotesCollapsed: SetState<boolean>;
    selectedNote: JobListingNote | null;
    selectedNoteName: string;
    setSelectedNoteName: SetState<string>
    fetchJobListingNotesWrapper: () => void;
}

export const NotesSection = ({ jobListingNoteNames, isNotesCollapsed, setIsNotesCollapsed, selectedNoteName, setSelectedNoteName, selectedNote, fetchJobListingNotesWrapper }: INotesSection) => {

    const {setAlertBannerData, setIsAlertBannerOpen}  = useContext(AppContext)

    const deleteNoteHandler = () => {
        assert(!!selectedNote, "expected selected note NOT to be falsy!")

        deleteJobListingNote(selectedNote!.id).then(() => {
            setAlertBannerData({
                message: "successfully deleted note",
                type: "info"
            })
            setIsAlertBannerOpen(true)
            fetchJobListingNotesWrapper()
        }).catch(() => {
            setAlertBannerData({
                message: "failed to delete note",
                type: "alert"
            })
            setIsAlertBannerOpen(true)
        })

    }

    return <div className='notes-section'>
        <div className='notes-section__header'>
            <h3>Notes ({jobListingNoteNames.length})</h3>
            {generateSectionToggleButton(isNotesCollapsed, setIsNotesCollapsed)}
        </div>
        {!isNotesCollapsed && jobListingNoteNames.length > 0 &&
            <div className='notes-section__content'>
                <SelectorGrid value={selectedNoteName} setValue={setSelectedNoteName} options={jobListingNoteNames} maxRowLen={4} />
                {selectedNote && <textarea readOnly value={selectedNote.content} />}
                {selectedNote &&
                    <div className='notes-section__content__icon-row'>
                        <button onClick={deleteNoteHandler}>
                            <img className='icon delete' src={deleteIcon} />
                        </button>
                        <button>
                            <img className='icon edit' src={editIcon} />
                        </button>
                    </div>
                }
            </div>
        }
    </div>
}