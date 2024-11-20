import axios from 'axios'

export const deleteQuestion = async (id: number) => {
    return await axios.delete(`/questions/${id}`)
}