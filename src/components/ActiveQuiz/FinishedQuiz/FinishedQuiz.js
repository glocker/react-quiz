import React from 'react'
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                <li>
                    <strong>1. </strong>
                    text
                    <i className={'fa fa-times' + classes.error}></i>
                </li>

                <li>
                    <strong>1. </strong>
                    text
                    <i className={'fa fa-check' + classes.success}></i>
                </li>
            </ul>

            <p>right 4 of 10</p>

            <div>
                <button>Repeat</button>
            </div>
        </div>
    )
}

export default FinishedQuiz