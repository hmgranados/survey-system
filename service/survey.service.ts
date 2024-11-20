import {ResponseSurvey, SurveyView} from "../models";
import axios from "axios";

export const surveyResponse = async (data: ResponseSurvey): Promise<string> => {
    console.log("las respuestas antes de enviarlas: ", data)
    return await axios.post('/userQuestions', data)
}

export const surveyList = async () => {
    return await axios.get(`/surveys`) || [];
}

export const surveyForId = async (id: number) => {
    const data = await axios.get(`/surveys/${id}`)
    return data
}

export const surveyDelete = async (id: number) => {
    return await axios.delete(`/surveys/${id}`)
}

export const surveyUpdate = async (data: SurveyView, id: number) => {
    try {
        console.log("data: ", data.descripcion, " ", data.titulo, " ", id, " ", data.listaPreguntas)
        const dataUpdate = {
            title: data.titulo,
            description: data.descripcion
        }
        await axios.put(`/surveys/${id}`, dataUpdate)


        data.listaPreguntas.map(async (pregunta) => {
            const questionsTypes = await axios.get(`/typesQuestions`)
            const questionType = questionsTypes.data.find((type: {id: number, name: string}) => type.name === pregunta.tipoDePregunta)
            const questionUpdate = {
                title: pregunta.titulopregunta,
                survey: id,
                typeQuestion: questionType.id
            }
            const response = await axios.post(`/questions`, questionUpdate)

            if (pregunta.tipoDePregunta === "opciones") {
                pregunta.opciones.map(async (opcion) => {
                    const answerUpdate = {
                        description: opcion.valor,
                        question: response.data.id
                    }
                    await axios.post(`/answers`, answerUpdate)
                })
            }
        })

        console.log("Encuesta actualizada correctamente")
    }catch (error) {
        console.log("error: ", error)
    }
}