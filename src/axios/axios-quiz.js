import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-37bcb-default-rtdb.europe-west1.firebasedatabase.app/'
})