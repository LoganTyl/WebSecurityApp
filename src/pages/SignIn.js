import '../styles/style.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SignIn extends Component {
    render(){
        return (
            <>
                <div className="container">
                    <h1>Sign In</h1>
                    <div className="signInFields">
                        <p className="invalidSignIn" hidden>Invalid email and/or password!</p>
    
                        <label htmlFor="emailSignIn">Email:</label>
                        <input type="email" className="emailInput" id="emailSignIn"/>
    
                        <label htmlFor="passwordSignIn">Password:</label>
                        <input type="password" className="passwordInput" id="passwordSignIn"/>
    
                        {/* TODO: Get button to redirect to /home */}
                        <button type="submit" className="signInBtn" onClick={()=>window.location.href="/home"}>Sign In</button>
                    </div>
                    <a href="/signUp">Create an Account</a>
                </div>
            </>
        )
    }
}

export default SignIn;