import React, { useState, useContext } from 'react';

import UserContext from '../context/UserContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, setUser } = useContext(UserContext);

    const signUserIn = () => {
        // TODO remove AWS links and switch to custom back-end API
        fetch('https://5s65q9qmwk.execute-api.us-west-1.amazonaws.com/api/user/validate', {
            method: 'POST',
            body: {
                'email': email,
                'password': password
            }
        })
        .then(data => console.log(data));
        // window.location.href='/home'
    }

    return (
        <div className='container'>
            <h1>Trivia App Sign In</h1>
            <div className='signInFields'>
                <p className='invalidSignIn' hidden>Invalid email and/or password!</p>

                <label htmlFor='emailSignIn'>Email:</label>
                <input type='email' className='emailInput' id='emailSignIn' onChange={evt => setEmail(evt.target.value)}/>

                <label htmlFor='passwordSignIn'>Password:</label>
                <input type='password' className='passwordInput' id='passwordSignIn' onChange={evt => setPassword(evt.target.value)}/>

                {/* TODO: Get button to redirect to /home */}
                <button type='submit' className='signInBtn' onClick={evt => signUserIn(evt)}>Sign In</button>
            </div>
            <a href='/signUp' className="createAccountLink">Create an Account</a>
        </div>
    )
}

export default SignIn;