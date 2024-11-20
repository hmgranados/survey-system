import  Question  from "./Question";
import Container from '@mui/material/Container';

interface Answer {
    id: number;
    description: string;
}

interface TypeQuestion {
    id: number;
    name: string;
}

interface Questionn {
    id: number;
    title: string;
    typeQuestion: TypeQuestion;
    answers: Answer[];
}

interface ListQuestionsProps {
    questions: Questionn[];
}

const ListQuestions: React.FC<ListQuestionsProps> = ({ questions }) => {

    return (
        <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
            width: '100%',
            padding: "30px 70px 30px 70px",
        }}>
            {questions?.map((questions, index) => (
                <div key={index}>
                    <Question question={questions}/>
                </div>
            ))}
        </Container>
    );
}

export default ListQuestions;