import {responseSchema,
    ResponseSurvey,
    ResponseType} from '../../models'
import  ListQuestions  from './ListQuestions'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {useUserStore} from "../../hooks";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from '@mui/material/LinearProgress';
interface QuestionType {
    id: number;
    title: string;
    typeQuestion: { id: number; name: string };
    answers: Array<{ id: number; description: string }>;
}

export type SurveyModel = {
    id: number;
    title: string;
    description: string;
    questions: QuestionType[];
};

export type surveyType = {
    survey: SurveyModel;
    onSubmitHandler: (data: ResponseSurvey) => void;
    loading: boolean;
};

const Content: React.FC<surveyType> = ({ survey, onSubmitHandler, loading }) => {

    const user = useUserStore();

    const methods = useForm<ResponseType>({
        resolver: zodResolver(responseSchema)
    });

    const onSubmit: SubmitHandler<ResponseType> = (data: ResponseType) => {
        const idQuest = Object.keys(data);
        const answers: ResponseSurvey[] = idQuest.map((objec) => {
            return {
                user: user.id,
                question: Number(objec),
                answer: data[objec]
            }
        });
        answers.forEach((answer: ResponseSurvey) => {
            onSubmitHandler(answer);
        })
    };

    return (
        <>
            {methods.formState.isSubmitting && (
                <LinearProgress />
            )}
            {loading ? (
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                </div>
            ) : (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} style={{
                        border: "1px solid #89939E", marginBottom: "50px", borderRadius: "20px",
                        display: 'flex',
                        flexDirection: 'column',
                        fontFamily: 'Noto Sans',
                        paddingBottom: "50px",
                    }}>
                        <Box bgcolor={"#00B8B0"} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            padding: '30px 0 20px 0',
                            borderRadius: '12px 12px 40% 40%',
                            height: "200px",
                        }}>
                            <h1 style={{
                            fontSize: '48px',
                            color: '#FFFFFF',
                            fontWeight: 400,
                            }}>{survey.title}</h1>
                            <span style={{fontSize: "20px",
                                color: "#FFFFFF"}}>{survey.questions.length} preguntas</span>
                        </Box>
                        <Box padding={"50px 70px 0 70px"} color={"#89939E"}>
                            <h2 style={{fontSize: "30px"}}>{survey.description}</h2>
                        </Box>
                        <ListQuestions questions={survey.questions} />
                        {methods.formState.isValid && (
                            <span style={{
                                paddingLeft: "70px",
                                fontSize: "20px",
                                color: "#66BB69",
                            }}>Gracias por responder la encuesta</span>
                        )}
                        <Box sx={{paddingLeft: "70px", paddingTop: "20px"}}>
                            <Button variant="contained" type="submit"
                                    sx={{backgroundColor: "#00B8B0",
                                        padding: "15px 30px",
                                        borderRadius: "17px",
                                    }}>Enviar respuestas
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
            )}
        </>
    );
}

export default Content;