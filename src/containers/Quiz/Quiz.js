import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/ActiveQuiz/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        // If the user came to 2nd (or more) question and went away to another page we should let him start from the 1st question
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                

                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    { this.props.loading && this.props.quiz
                        ? <Loader /> // Show loader
                        : this.props.isFinished 
                            ? <FinishedQuiz 
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryHandler}
                            /> 
                            
                            :   <ActiveQuiz 
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />
                    }
                 </div>
            </div>

            
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)