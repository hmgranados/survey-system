import {useMutation, useQuery} from "react-query";
import {surveyDelete, surveyList} from "../../service";
import {SurveyModel} from "../../models";
import {useEffect, useState} from "react";
import { survey } from '../../utils'

const useSurveyList = () => {
    const [surveyListData, setSurveys] = useState<SurveyModel[]>([survey]);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucefullDelete, setSucefullDelete] = useState<boolean>(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['surveyList'],
        queryFn: () => surveyList(),
    });

    useEffect(() => {
        setLoading(isLoading)
        if (data?.data && !isLoading) setSurveys(data?.data);
    }, [data?.data, isLoading]);

    const mutationDelete = useMutation({
        mutationFn: surveyDelete,
        onSuccess: () => {
            setSucefullDelete(false);
        },
    });

    const hanleDelete = (id: number) => {
        setSucefullDelete(true);
        setSurveys(() => surveyListData.filter(survey => survey.id !== id));
        mutationDelete.mutate(id)
    }

    return {
        error,
        surveyListData,
        loading,
        hanleDelete,
        sucefullDelete
    }
}

export default useSurveyList;