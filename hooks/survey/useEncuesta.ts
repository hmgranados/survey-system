import {SurveyView} from "../../models";
import {useNavigate, useParams} from "react-router-dom";
import { useMutation } from "react-query";
import routes from "../../routes/routes";
import { handleSurveyCreation } from "../../service/endCuesta";
import {useUserStore} from "../user";
import {surveyUpdate} from "../../service";


const useEncuesta= () => {

    const navigate = useNavigate();
    const user = useUserStore(state => state);

    const { idSur } = useParams<{ idSur: string }>();
    const idSurvey = Number(idSur);

    const mutation = useMutation({
        mutationFn: (datos: SurveyView) => handleSurveyCreation(datos, user.id),
        onSuccess: (data: string) => {
            console.log('Encuesta creada correctamente: ', data);
            navigate(routes.ADMIN.SURVEYS);
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: (datos: SurveyView) => surveyUpdate(datos, idSurvey),
        onSuccess: (data) => {
            console.log('Encuesta actualizada correctamente: ', data);
            navigate(routes.ADMIN.SURVEYS);
        },
    })

    const onHanleUpdate = (data: SurveyView) => {
        mutationUpdate.mutate(data);
    }

    const onSubmitHandler = (data: SurveyView) => {
        mutation.mutate(data);
    };

    return {
        onSubmitHandler,
        onHanleUpdate

    }
}
export default useEncuesta;