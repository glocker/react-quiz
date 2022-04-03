import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY } from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state = initialState, action) {

    switch(action.type) {
        
        /* 
        *
        * QuizList
        * 
        */
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
                // enable loading when trying to fetch data
            }

        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
                // set loading to false because we finished downloading
                // set coming quizes array to action.quizes
            }

        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        
        /* 
        *
        * Quiz
        * 
        */
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            } 
        
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
            
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            }

        case QUIZ_NEXT_QUESTION:
            return {
                ...state, answerState: null, activeQuestion: action.number
            }    
        
        case QUIZ_RETRY:
            return {
                ...state, 
                activeQuestion: 0, 
                answerState: null,
                isFinished: false,
                results: []
            }    

        default: 
            return state
    }

}