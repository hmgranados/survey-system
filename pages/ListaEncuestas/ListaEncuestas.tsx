import { FiSearch } from 'react-icons/fi';
import {NavLink, useNavigate} from 'react-router-dom';
import estilo from './ListaEncuetas.module.css';
import routes from '../../routes/routes'
import {useSurveyList, useUserStore} from "../../hooks";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from '@mui/material/LinearProgress';
import editSurvey from "../../hooks/survey/editSurvey.ts";

const ListaEncuestas = () => {
    const navigate = useNavigate();

    const { surveyListData, loading, hanleDelete, sucefullDelete } = useSurveyList();

    const user = useUserStore((state) => state);
    const setedit = editSurvey((state) => state.setNoEdit);

    const hadleEdita = (id: number) => {
        setedit(true);
        localStorage.setItem("edit", true.toString());
        navigate(`/admin/surveys/editar/${id}`)
    }

    const handleResponderClick1 = () => {
        setedit(false);
        localStorage.setItem("edit", false.toString());
        navigate(routes.ADMIN.SURVEYCREATE);
    }
        return (
            <>
                {sucefullDelete && (
                    <LinearProgress />
                )}
                <div className={estilo.RecuadroGRANDE}>
                    <div className={estilo.Primero}>
                        <div className={estilo.Texto}>
                            <h3>¡Hola, Bienvenido!</h3>
                            {user.roles[0].name === "ADMIN" && (
                                <button onClick={handleResponderClick1} className={estilo.botonCrear}>Crear
                                    encuesta
                                </button>
                            )}
                        </div>
                        <div className={estilo.Busqueda}>
                            <div className={estilo.SearchContainer}>
                                <input type="search" placeholder="Buscar..." className={estilo.searchInput} />
                                <FiSearch className={estilo.searchIcon} />
                            </div>
                        </div>
                    </div>
                    {surveyListData.length === 0 && (
                        <div className={estilo.Segundo}>
                            <div className={estilo.Card}>
                                <label>No hay encuestas disponibles</label>
                            </div>
                        </div>
                    )}
                    <div className={estilo.Lista}>
                        {loading ? (
                            <CircularProgress/>
                        ) : (
                            surveyListData?.map(survey => (
                                <div key={survey.id} className={estilo.Card}>
                                    <label>{survey.title}</label>
                                    <img
                                        src="https://img.freepik.com/vector-gratis/ilustracion-concepto-encuesta-clientes_114360-568.jpg?t=st=1729353945~exp=1729357545~hmac=7c868b11def63b6045936d7caf58045a5f93ba239a02be197e74bcb0868464f3&w=740"
                                        alt="Card 1"/>
                                    <div className={estilo.BotonesAcciones}>
                                        {user.roles[0].name === "ADMIN" ? (
                                            <div className={estilo.BotonesAcciones}>
                                                <button onClick={() => hadleEdita(survey.id)}
                                                >Editar
                                                </button>
                                                <button onClick={() => hanleDelete(survey.id)}
                                                        style={{backgroundColor: "#ff4848", color: "white"}}
                                                >Eliminar
                                                </button>
                                                <button onClick={() => navigate(`/admin/surveys/resultados/${survey.id}`)}
                                                >Ver Resultados
                                                </button>
                                            </div>

                                        ) : (
                                            <Button variant="contained"
                                                    component={NavLink}
                                                    to={`/surveys/${survey.id}`}
                                                    style={{backgroundColor: "#00B8B0", textTransform: "capitalize"}}>
                                                Responder
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
</>
)
    ;

}

export default ListaEncuestas;
