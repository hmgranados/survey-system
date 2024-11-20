import {Control, useFieldArray, UseFormRegister} from "react-hook-form";
import { TextField, Button, IconButton } from '@mui/material';
import { MdDelete } from "react-icons/md";
import React from "react";

interface OpcionesInputProps {
    control: Control<any>;
    register: UseFormRegister<any>;
    index: number;
}

const OpcionesInput: React.FC<OpcionesInputProps> = ({ control, register, index }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `listaPreguntas.${index}.opciones`,
    });

    return (
        <div>
            {fields.map((opcion, subIndex) => (
                <div key={opcion.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <TextField
                        label={`Opción ${subIndex + 1}`}
                        {...register(`listaPreguntas.${index}.opciones.${subIndex}.valor`)}
                        fullWidth
                    />
                    <IconButton onClick={() => remove(subIndex)}>
                        <MdDelete />
                    </IconButton>
                </div>
            ))}

            <Button type="button" onClick={() => append({ valor: '' })}>
                Agregar Opción
            </Button>
        </div>
    );
};

export default OpcionesInput;