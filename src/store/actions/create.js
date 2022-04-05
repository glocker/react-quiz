import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createTestHandler (item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetTestCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishTestCreate () {
    return async  (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz)
        dispatch(resetTestCreation())
    }
}