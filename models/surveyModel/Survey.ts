import { QuestionType } from './SurveyView';

export interface SurveyModel {
    id: number;
    title: string;
    description: string;
    questions: QuestionType[];
}

export type surveyType = {
    survey: SurveyModel;
};

export interface ResponseSurvey {
    user: number;
    question: number;
    answer: string;
}

export interface SurveyCreate  {
    title: string,
    description: string;
};

export type SurveyQuestion = {
    title: string;
    survey: number;
    typeQuestion: number;
}

export interface SurveyAnswers {
    description: string,
    question: number;
}