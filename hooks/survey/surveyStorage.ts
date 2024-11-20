import { create } from 'zustand';
import { SurveyModel} from "../../models";

const surveyInitial: SurveyModel ={
    id: 0,
    title: "",
    description: "",
    questions: [],
}

const initialSurvey = localStorage.getItem('survey') ? JSON.parse(<string>localStorage.getItem('survey')): surveyInitial;

interface SurveyStorage extends SurveyModel {
    setSurveyS: (surveyData: SurveyModel) => void;
}

const useSurveyStore = create<SurveyStorage>((set) => ({
    ...initialSurvey,
    setSurveyS: (surveyData: SurveyModel) => set( { ...surveyData })
}));

export default useSurveyStore;
