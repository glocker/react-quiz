import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Button from '../../components/ActiveQuiz/UI/Button/Button';
import Input from '../../components/ActiveQuiz/UI/Input/Input'
import Select from '../../components/ActiveQuiz/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/Form';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {createTestHandler, finishTestCreate} from "../../store/actions/create";
import {connect} from "react-redux";

function createOptionControl(number) {
    return createControl({
        label: `Answer ${number}`,
        errorMessage: 'Answer field can not be empty',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Add question',
            errorMessage: 'Question can not be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = event => {
        event.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createTestHandler(questionItem)

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }

    createTestHandler = event => {
        event.preventDefault();

        // After adding new test let's update 'create test' block
        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
        this.props.finishTestCreate()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null }
                    { index === 0 ? <br /> : null }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Choose right answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div className="div">
                    <h1>Create test</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        { select }

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}>
                            Add question
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createTestHandler}
                            disabled={this.props.quiz.length === 0}>
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createTestHandler: item => dispatch(createTestHandler(item)),
        finishTestCreate: () => dispatch(finishTestCreate())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
