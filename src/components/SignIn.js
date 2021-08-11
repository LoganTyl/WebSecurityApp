import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UserContext from '../context/UserContext';

class SignIn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.updateState = this.updateState.bind(this);
        this.signUserIn = this.signUserIn.bind(this);
    }

    updateState (prop, value) {
        this.setState({
            [prop]: value
        }, () => {
            console.log(this.state);
        });
    }

    signUserIn () {
        fetch('https://5s65q9qmwk.execute-api.us-west-1.amazonaws.com/api/user/validate', {
            method: "POST",
            body: {
                "email": "",
                "password": ""
            }
        })
        .then(data => console.log(data))
        // window.location.href="/home"
    }

    render () {
        return (
            <>
                <div className="container">
                    <h1>Trivia App Sign In</h1>
                    <div className="signInFields">
                        <p className="invalidSignIn" hidden>Invalid email and/or password!</p>
    
                        <label htmlFor="emailSignIn">Email:</label>
                        <input type="email" className="emailInput" id="emailSignIn" onChange={evt => this.updateState('email', evt.target.value)}/>
    
                        <label htmlFor="passwordSignIn">Password:</label>
                        <input type="password" className="passwordInput" id="passwordSignIn" onChange={evt => this.updateState('password', evt.target.value)}/>
    
                        {/* TODO: Get button to redirect to /home */}
                        <button type="submit" className="signInBtn" onClick={this.signUserIn}>Sign In</button>
                    </div>
                    <a href="/signUp" className="createAccountLink">Create an Account</a>
                </div>
            </>
        )
    }
}

export default SignIn;