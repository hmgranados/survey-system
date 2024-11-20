import React from "react";
import estilo from "./Fase1.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import useSurveyStore from "../../hooks/survey/surveyStorage.ts";

interface Fase1Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isEditing: boolean;
}

const Fase1: React.FC<Fase1Props> = ({ register, errors, isEditing }) => {
    const survey = useSurveyStore((state) => state);

  return (
    <div className={estilo.contenedor}>
      <div style={{display: "flex", flexDirection: "column"}}>
        <input
          type="text"
          placeholder={isEditing ? survey.title: "Escriba un título"}
          className={estilo.input}
          defaultValue={isEditing ? survey.title : ""}
          {...register("titulo", { required: true })}
        />
        {errors.titulo && <span className={estilo.error}>El título es obligatorio</span>}
      </div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <h3 className={estilo.tituloDesc}></h3>
        <textarea defaultValue={isEditing ? survey.description : ""}
          placeholder={isEditing ? survey.description : "Escriba una descripción"}
          {...register("descripcion", { required: true })}
        ></textarea>
        {errors.descripcion && <span className={estilo.error}>La descripción es obligatoria</span>}
      </div>
    </div>
  );
};

export default Fase1;
