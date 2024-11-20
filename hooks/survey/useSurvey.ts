import {ResponseSurvey, SurveyModel} from "../../models";
import {surveyResponse, surveyForId} from "../../service";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import routes from "../../routes/routes";
import {useState} from "react";
import {useSurveyStorage} from "./index.ts";

const useSurvey= (id: number) => {
    const [surv, setSurvey] = useState<SurveyModel>({id: 0, title: '', description: '', questions: []})

    const surveyStorage = useSurveyStorage((survey) => survey );

    const { isLoading } = useQuery({
        queryKey: ['surveyForId', id],
        queryFn: () => surveyForId(id),
        onSuccess: (data) => {
            console.log("cargando", data)
            surveyStorage.setSurveyS(data.data)
            localStorage.setItem('survey', JSON.stringify(data.data));
            setSurvey(data.data)
        }
    })

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (surveyRes: ResponseSurvey) => surveyResponse(surveyRes),
        onSuccess: (data: string) => {
            console.log('Encuesta enviada correctamente: ', data);
            navigate(routes.USER.SURVEYS);
        },
    });

    const onSubmitHandler = (surveyRes: ResponseSurvey) => {
        mutation.mutate(surveyRes);
    };

    return {
        surv,
        isLoading,
        onSubmitHandler,
    }
}

export default useSurvey;