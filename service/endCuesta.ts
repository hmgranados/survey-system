import axios from 'axios';
import {SurveyAnswers,
  SurveyView,
  SurveyCreate,
  SurveyQuestion
} from '../models';

interface AsociateSurvey{
    survey: number;
    user: number;
}

export const createSurvey = async (surveyData: SurveyCreate) => {
  return await axios.post('/surveys ', surveyData);
}

export const asociateSurvey = async (asociate: AsociateSurvey) => {
    return await axios.post('/userSurveys', asociate);
}

export const createTypeQuestion = async (typeQuestion: string) => {
  return await axios.post('/typesQuestions', { name: typeQuestion });
}

export const createQuestion = async (questionData: SurveyQuestion) => {
  return await axios.post('/questions', questionData);
};


export const createAnswers = async (answers: SurveyAnswers,) => {
  return await axios.post('/answers', answers);
};

const getTypeQuestion = async () => {
    return await axios.get(`/typesQuestions`);
}


export const handleSurveyCreation = async (surveyBody: SurveyView, id: number): Promise<string> => {
  try {
    console.log("surveyBody: ", surveyBody)
    const surveyBodyM: SurveyCreate = {
        title: surveyBody.titulo,
        description: surveyBody.descripcion,
    }
    const surveyResponse = await createSurvey(surveyBodyM);

    const asociate: AsociateSurvey = {
      survey: surveyResponse.data.id,
      user: id
    }

    await asociateSurvey(asociate);

    surveyBody.listaPreguntas.map(async (pregunta: any) => {
        console.log("pregunta: ", pregunta)
      const typeQuestions = await getTypeQuestion();
      const typeQuestion = typeQuestions.data.find((type: {id: number, name: string}) => type.name === pregunta.tipoDePregunta);

      const newbuidQues: SurveyQuestion = {
        title: pregunta.titulopregunta,
        survey: surveyResponse.data.id,
        typeQuestion: typeQuestion.id,
      }
      const questionResponse = await createQuestion(newbuidQues);

      if (pregunta.tipoDePregunta === 'opciones') {
          pregunta.opciones.map(async (opcion: any) => {
            const newAnswer = {
                description: opcion.valor,
                question: questionResponse.data.id,
            }
            console.log("una respuesta para la pregunta de tipo opciones: ",questionResponse.data, newAnswer)
            await createAnswers(newAnswer);
          })
      } else if (pregunta.tipoDePregunta === 'parrafo') {
          const newAnswer = {
            description: pregunta.textoDelTextArea,
            question: questionResponse.data.id,
          }
          console.log("una respuesta para la pregunta de tipo parrafo: ",questionResponse.data, newAnswer)
          await createAnswers(newAnswer);
      }
    })

    return "Creación exitosa"

  } catch (error) {
    console.error('Error en el proceso de creación:', error);
    throw error;
  }
};
