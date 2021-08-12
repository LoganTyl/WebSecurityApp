import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';

import APIContext from '../context/APIContext';
import UserContext from '../context/UserContext';

const SignIn = () => {
    const { api } = useContext(APIContext);
    const { user, setUser } = useContext(UserContext);

    const [error, setError] = useState(null);
    
    useEffect(() => {
        // TODO fix me!
        console.log(user);
        if (user && user._id) setUser(null);
    }, [user, setUser]);

    const submitSignInForm = async evt => {
        evt.preventDefault();
        setError(null);
        
        await Axios.post(`${api}/user/validate`, {
            email: evt.target.email.value,
            password: evt.target.password.value
        })
        .then(user => {
            setUser(user);
            window.location.href='/home';
        })
        .catch(reason => {
            setError(reason.message);
            console.log(reason.message);
        })

    }

    return (
        <div className='container'>
            <a href='/signUp'>Create an Account</a>

            <h1>Trivia App Sign In</h1>
            <form className='signInFields' onSubmit={submitSignInForm}>

                <label htmlFor='email'>Email</label>
                <input type='email' id='email'/>

                <label htmlFor='password'>Password</label>
                <input type='password' id='password'/>

                <button type='submit'>Sign In</button>
            </form>

            { error ?
                <>
                    <span className="errorMessage">{error}</span>
                    <br />
                </>
            : null }
        </div>
    )
}

export default SignIn;