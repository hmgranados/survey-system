import estilos from './Botones.module.css';
import { FaCheck } from "react-icons/fa";
import {useEditSurvey} from "../../hooks";

interface BotonesProps {
  onSubmit: () => void;
}

export const Botones: React.FC<BotonesProps> = ({ onSubmit }) => {
    const { noedit } = useEditSurvey((state) => state);
  return (
    <div className={estilos.contenedor}>
      <button className={estilos.confirmar} onClick={onSubmit}>
        <FaCheck /> {noedit ? "Editar encuesta" : "Crear encuesta" }
      </button>
    </div>
  );
};
