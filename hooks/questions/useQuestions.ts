import {useMutation} from "react-query";
import {deleteQuestion} from "../../service/questions.service.ts";

const useQuestions = () => {

    const mutationDelete = useMutation({
        mutationFn: (id: number) => deleteQuestion(id),
        onSuccess: () => {
            console.log('Question deleted');
        },
    });

    const handleQuestionDelete = (id: number) => {
        mutationDelete.mutate(id);
    }
    return {
        handleQuestionDelete,
    }
}

export default useQuestions;