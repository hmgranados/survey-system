import './style.css';
import Box from '@mui/material/Box';
import {FieldError, useFormContext} from "react-hook-form";

interface Answer {
    id: number;
    description: string;
}

interface TypeQuestion {
    id: number;
    name: string;
}

interface Question {
    id: number;
    title: string;
    typeQuestion: TypeQuestion;
    answers: Answer[];
}

interface QuestionProps {
    question: Question;
}

const Question: React.FC<QuestionProps> = ({ question }) => {

    const {register, formState: { errors } } = useFormContext()
    const hasError = errors[`${question.id}`];

  return (
      <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%'
      }}>
          <p style={{color: "#717171", fontWeight: "bold"}}>
              {question.title}
          </p>
            <hr style={{color: "#ABBED1"}}/>
          {(question.typeQuestion.name !== "parrafo") ? (
              question.answers.map((answer, index) => (
                <li key={index} className="respuestas">
                        <label className="radios">
                            <input id={answer.id.toString()}
                                   className={errors ? "radio": "radio-error"}
                                   type="radio"
                                   value={answer.description}
                                   {...register(`${question.id}`, { required: "Este campo es obligatorio" })}
                            />
                            <p>{answer.description}</p>
                        </label>
                </li>
              ))

          ) : (
              <textarea
                        className={hasError ? "textarea-error": "textarea"}
                        placeholder="Escribe tu respuesta aquí"
                        {...register(`${question.id}`, { required: "Este campo es obligatorio" })}
              />
          )}
          {hasError && <div style={{color: "red"}}>
              {(errors[`${question.id}`] as FieldError)?.message}
          </div>}
      </Box>
  );
}

export default Question;