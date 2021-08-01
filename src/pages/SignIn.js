import '../styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Home from './Home';

const SignIn = () => {
    console.log('in react')

    return (
        <Router>
            <div className="container">
                <h1>Sign In</h1>
                <div className="signInFields">
                    <p className="invalidSignIn" hidden>Invalid email and/or password!</p>

                    <label for="emailSignIn">Email:</label>
                    <input type="email" className="emailInput" id="emailSignIn"/>

                    <label for="passwordSignIn">Password:</label>
                    <input type="password" className="passwordInput" id="passwordSignIn"/>

                    {/* TODO: Get button to redirect to /home */}
                    <button type="submit" className="signInBtn">Sign In</button>
                </div>
                <Link to="/signUp">Create An Account</Link>
                <Switch>
                    <Route path="/signUp">
                        <SignUp/>
                    </Route>
                    {/* TODO: Add authentication so user cannot go straight to home */}
                    <Route path="/home">
                        <Home/>    
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default SignIn;