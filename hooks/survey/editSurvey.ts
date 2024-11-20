import {create} from "zustand";


interface EditSurvey {
    noedit: boolean;
    setNoEdit: (noedit: boolean) => void;
}

const noedit = localStorage.getItem("edit") ? true : false;

const editSurvey = create<EditSurvey>((set) => ({
    noedit,
    setNoEdit: (noedit: boolean) => set({noedit})
}))

export default editSurvey;