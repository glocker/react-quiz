import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        isFinished: true,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' || 'error'}
        quiz: [
            {   question: 'Whats the color of the sky?',
                id: 1,
                rightAnswerId: 2, 
                answers: [
                    {text: 'Balck', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Red', id: 3},
                    {text: 'Green', id: 4}
                ]
            },

            {   question: 'Whats capital of Great Britain?',
                id: 2,
                rightAnswerId: 3, 
                answers: [
                    {text: 'New York', id: 1},
                    {text: 'Paris', id: 2},
                    {text: 'London', id: 3},
                    {text: 'Edinburg', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]

            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        this.setState({
            answerState: {[answerId]: 'success'}
        })

        const question = this.state.quiz[this.state.activeQuestion]

        if (question.rightAnswerId === answerId) {

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        }
        else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }

        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                

                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    {
                        this.state.isFinished 
                        ? <FinishedQuiz 

                          /> 
                         
                        :   <ActiveQuiz 
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                 </div>
            </div>

            
        )
    }
}

export default Quiz