import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

import APIContext from '../context/APIContext';
import UserContext from '../context/UserContext';

const SignIn = () => {
    const { api } = useContext(APIContext);
    const { user, setUser } = useContext(UserContext);

    const [error, setError] = useState(null);

    const submitSignInForm = async evt => {
        evt.preventDefault();
        setError(null);
        
        await Axios.post(`${api}/user/validate`, {
            email: evt.target.email.value,
            password: evt.target.password.value
        })
        .then(res => {
            if (res?.data?.data) setUser(res.data.data);
        })
        .catch(reason => {
            console.log(reason);
            if (reason?.response?.data?.error) setError(reason.response.data.error);
            else setError(reason.message);
        });
    }

    if (user && user._id) return <Redirect to='/home' />
    return (
        <div className='container'>
            <div className='signInHeaders'>
                <a href='/signUp'>Create an Account</a>
                <a href='/home'>Go to Homepage</a>
            </div>

            <h1>Trivia App Sign In</h1>
            <form className='signInFields' onSubmit={submitSignInForm}>

                <label htmlFor='email'>Email</label>
                <input type='email' id='email'/>

                <label htmlFor='password'>Password</label>
                <input type='password' id='password'/>

                <button type='submit'>Sign In</button>
            </form>

            { error ? <>
                <span className='errorMessage'>{error}</span>
                <br />
            </> : null }
        </div>
    );
}

export default SignIn;