import React, {Component} from 'react'
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../ActiveQuiz/UI/Backdrop/Backdrop'

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks (links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [
            {to: '/', label: 'List', exact: true}
        ];

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Create test', exact: false})
            links.push({to: '/logout', label: 'Logout', exact: false})
        } else {
            links.push({to: '/auth', label: 'Authentication', exact: false})
        }
        
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer