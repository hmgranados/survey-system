

import estilo from './Encuesta.module.css'
import {Button, IconButton} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Fase1 from "../../components/Fase1/Fase1";
import Fase2 from "../../components/Fase2/Fase2";
import { Botones } from "../../components/Botones/Botones";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import useEncuesta from "../../hooks/survey/useEncuesta";
import { SurveyView } from "../../models";
import LinearProgress from '@mui/material/LinearProgress';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import {useParams} from "react-router-dom";
import {useQuestions, useSurvey} from "../../hooks";
import editSurvey from "../../hooks/survey/editSurvey.ts";
import {useEffect, useState} from "react";

function Encuesta() {
  

  


  const { idSur } = useParams<{ idSur?: string }>();
  const idSurvey = idSur ? Number(idSur) : null;

  const { surv } = idSurvey ? useSurvey(idSurvey) : { surv: null };

  const [questions, setQuestions] = useState(surv?.questions || []);

  useEffect(() => {
    if (surv?.questions) {
      setQuestions(surv.questions);
    }
  }, [surv]);

  const { handleQuestionDelete  } = useQuestions();

  const handleRemoveQuestion = (id: number, indexToRemove: number) => {
    handleQuestionDelete(id);
    setQuestions((prevQuestions) =>
        prevQuestions.filter((_, index) => index !== indexToRemove)
    );
  };

  const isedit = editSurvey((state) => state);

 

  const isEditing = isedit.noedit;

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control,
    watch } = useForm<SurveyView>({
    defaultValues: {
      titulo: '',
      descripcion: '',
      listaPreguntas: [],
      fechadeinicio: null, 
      fechadefin: null,


    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listaPreguntas',

  });

  const { onSubmitHandler, onHanleUpdate } = useEncuesta();

  const onSubmit : SubmitHandler<SurveyView> = (data: SurveyView) => {
    if (isEditing) {
      console.log(data)
      onHanleUpdate(data);
    }else{
      //onSubmitHandler(data);
      console.log(data);
    }
    reset()
  };

  return (
    <>
        {isSubmitting && <LinearProgress />}
      <div className={estilo.pagina}>
        <div className={estilo.primerParte}>
          <h1>Bienvenido</h1>
          <h2>¿Ya estás listo para crear tu encuesta?</h2>
        </div>

        <div className={estilo.contenedorMain}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fase1 register={register} errors={errors} isEditing={isEditing}/>
            <div className={estilo.preExis}>
              {isEditing && (
                  questions.map((pregunta: any, index) => {
                      return (
                          <div className={estilo.ExistingQuestions} key={index}>
                            <div key={pregunta.id} style={{display: "flex", flexDirection: "column",
                              marginBottom: "10px", alignItems: "start", gap: "10px", width: "100%"
                            }}>

                              <p> {index + 1}. {pregunta.title}</p>
                              <hr style={{width: "100%"}}/>
                              {pregunta.answers.map((answer: any) => {
                                return (
                                    <div key={answer.id}>
                                      <p> {answer.description}</p>
                                    </div>
                                )
                              })}
                            </div>
                            <IconButton onClick={() => handleRemoveQuestion(pregunta.id, index)} sx={{alignSelf: "start"}}>
                              <MdDelete />
                            </IconButton>
                          </div>
                      )
                  })
              )}
            </div>
            {fields.map((pregunta, index) => {
              return (
                  <div key={pregunta.id}>
                    <Fase2 key={index}
                           register={register}
                           errors={errors}
                           control={control}
                           idQuesR={index}
                           watch={watch}
                           remove={remove}
                           isEditing={isEditing}
                           pregunta={pregunta}
                    />
                  </div>
              )

              
            })}

            <Button variant="outlined" onClick={() => append({ titulopregunta: '', tipoDePregunta: 'opciones', opciones: [] })}>
              <CiCirclePlus />
              Agregar otra pregunta
            </Button>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='contenedorfinal'>   
                <h2 className="programate">Programa la encuesta:</h2>
                <div className="fechaContenedor">
                  <Controller name="fechadeinicio"control={control}
                  render={({ field}) => (
                  <DatePicker label="Fecha de inicio"
                  {...field}                
                  className="customTextField"onChange={(newValue) => field.onChange(newValue)}
                  />
                    )}
                    />
                  < Controller name="fechadefin"control={control}
                      render={({ field}) => (
                    <DatePicker label="Fecha de fin"                
                    {...field}                
                    onChange={(newValue) => field.onChange(newValue)}
                    />
                  )}
                  /> 
                  </div>
              </div>
            </LocalizationProvider>
              
            <Botones onSubmit={handleSubmit(onSubmit)} />
           
  
          </form>
         
        </div>
      </div>
    </>
  );
}

export default Encuesta;
