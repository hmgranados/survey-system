import estilos from "./Fase2.module.css";
import OpcionesInput  from './OpcionesInput'
import {Control, FieldErrors, UseFormRegister, Controller} from "react-hook-form";
import { TextField, Select, MenuItem, IconButton } from '@mui/material';
import { MdDelete } from "react-icons/md";

interface Fase2Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: Control<any>;
  idQuesR: number;
  isEditing?: boolean;
  pregunta: any;
  watch: any;
    remove: (index: number) => void
}

const Fase2: React.FC<Fase2Props> = ({register, errors, control, remove, idQuesR, watch, isEditing, pregunta}) => {
  const tipoDePregunta = watch(`listaPreguntas.${idQuesR}.tipoDePregunta`);


  const defaulValues = isEditing ? pregunta.title : "";

  return (
    <div className={estilos.contenedor}>
      <div>
        <input
          type="text"
          placeholder="Escriba su pregunta"
          className={estilos.pregunta}
          defaultValue={defaulValues}
          {...register(`listaPreguntas.${idQuesR}.titulopregunta`, { required: true })}
        />
        {errors.pregunta && <span className={estilos.error}>La pregunta es obligatoria</span>}
      </div>
        <Controller
            name={`listaPreguntas.${idQuesR}.tipoDePregunta`}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <Select {...field} fullWidth>
                    <MenuItem value="">
                        <em>Selecciona un tipo de pregunta</em>
                    </MenuItem>
                    <MenuItem value="opciones">Opciones</MenuItem>
                    <MenuItem value="parrafo">Párrafo</MenuItem>
                </Select>
            )}
        />
      {tipoDePregunta === "opciones" && (
          <OpcionesInput control={control} register={register} index={idQuesR} />
      )}
      {tipoDePregunta === "parrafo" && (
          <TextField
              label="Texto del Párrafo"
              {...register(`listaPreguntas.${idQuesR}.textoDelTextArea`)}
              multiline
              rows={4}
              fullWidth
          />
      )}

    <IconButton onClick={() => remove(idQuesR)}>
        <MdDelete />
    </IconButton>
    </div>
  );
};

export default Fase2;
