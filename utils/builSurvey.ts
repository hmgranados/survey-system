import {SurveyView, SurveyBodyModel, QuestionsBody, SurveyAnswers } from "../models";

export const builSurvey = (surveyView: SurveyView): SurveyBodyModel => {
    const questions: QuestionsBody[] = surveyView.listaPreguntas.map((pregunta) => {
        const answers: SurveyAnswers[] = [];
        if (pregunta.tipoDePregunta === 'opciones') {
            answers.push(...pregunta.opciones.map(opcion => ({
                description: opcion.valor,
                question: 0
            })));
        } else if (pregunta.tipoDePregunta === 'parrafo') {
            answers.push({
                description: pregunta.parrafo,
                question: 0
            });
        }

        return {
            question: {
                title: pregunta.titulopregunta,
                survey: 0,
                typeQuestion: 0
            },
            answers,
            tipoQ: pregunta.tipoDePregunta
        };
    });

    return {
        survey: {
            title: surveyView.titulo,
            description: surveyView.descripcion,
        },
        questions,
    };
};