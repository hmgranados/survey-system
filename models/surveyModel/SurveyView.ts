import { TypeQuestion, answerType } from "./TypeQuestion";
import {SurveyCreate, SurveyQuestion, SurveyAnswers} from "./Survey";
import { Dayjs } from "dayjs";

export interface QuestionType {
    id: number;
    question: string;
    type: TypeQuestion;
    answers: answerType[];
}
export interface SurveyView {
    titulo: string;
    descripcion: string;
    listaPreguntas: (
        | {
        titulopregunta: string;
        tipoDePregunta: 'opciones';
        opciones: { valor: string }[];
    }
        | {
        titulopregunta: string;
        tipoDePregunta: 'parrafo';
        parrafo: string;
    }
        )[];
       fechadeinicio:Dayjs| null ;
       fechadefin: Dayjs| null;
        
}

export type listQuestionsType = {
    questions: QuestionType[];
};

export interface QuestionsBody {
    question: SurveyQuestion;
    answers: SurveyAnswers[];
    tipoQ: string;
}

export interface SurveyBodyModel {
    survey: SurveyCreate;
    questions: QuestionsBody[];
}


