import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loading: false,
    error: null
}

export default function quizReducer(state = initialState, action) {

    switch(action.type) {

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


        default: 
            return state
    }

}