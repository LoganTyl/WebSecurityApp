import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

import APIContext from '../context/APIContext';
import UserContext from '../context/UserContext';

const EditAccount = () => {
    const { api } = useContext(APIContext);
    const { user, setUser } = useContext(UserContext);

    const [error, setError] = useState(null);

    const submitEditUserForm = async evt => {
        evt.preventDefault();
        setError(null);

        if (evt.target.password.value === evt.target.confirmPassword.value) {
            await Axios.put(`${api}/user/update`, {
                email: user.email,
                token: user.token,
                firstName: evt.target.firstName.value,
                lastName: evt.target.lastName.value,
                phone: evt.target.phone.value,
                street: evt.target.street.value,
                city: evt.target.city.value,
                state: evt.target.state.value,
                zipCode: evt.target.zipCode.value,
                password: evt.target.password.value,
            })
            .then(res => {
                setUser(res.data);
            })
            .catch(reason => {
                setError(reason.response.data.error);
            })
        } else setError('Passwords must match');
    }

    if (!(user && user._id)) return <Redirect to='/signIn' />
    return (
        <div className='container'>
            <a href='home'>Back</a>
            
            <h1>Sign Up</h1>
            <form className='editFields' onSubmit={submitEditUserForm}>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id='firstName' defaultValue={user.firstName} required/>

                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id='lastName' defaultValue={user.lastName} required/>

                <label htmlFor='phone'>Phone</label>
                <input type='tel' id='phone' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={user.phone} required/>
                <small>Ex: 111-222-3333</small>

                <label htmlFor='street'>Address</label>
                <input type='text' id='street' defaultValue={user.street} required/>

                <label htmlFor='city'>City</label>
                <input type='text' id='city' defaultValue={user.city} required/>

                <label htmlFor='state'>State</label>
                <select name='state' id='state' defaultValue={user.state} required>
                    <option value='AL'>AL</option>
                    <option value='AK'>AK</option>
                    <option value='AR'>AR</option>	
                    <option value='AZ'>AZ</option>
                    <option value='CA'>CA</option>
                    <option value='CO'>CO</option>
                    <option value='CT'>CT</option>
                    <option value='DC'>DC</option>
                    <option value='DE'>DE</option>
                    <option value='FL'>FL</option>
                    <option value='GA'>GA</option>
                    <option value='HI'>HI</option>
                    <option value='IA'>IA</option>	
                    <option value='ID'>ID</option>
                    <option value='IL'>IL</option>
                    <option value='IN'>IN</option>
                    <option value='KS'>KS</option>
                    <option value='KY'>KY</option>
                    <option value='LA'>LA</option>
                    <option value='MA'>MA</option>
                    <option value='MD'>MD</option>
                    <option value='ME'>ME</option>
                    <option value='MI'>MI</option>
                    <option value='MN'>MN</option>
                    <option value='MO'>MO</option>	
                    <option value='MS'>MS</option>
                    <option value='MT'>MT</option>
                    <option value='NC'>NC</option>	
                    <option value='NE'>NE</option>
                    <option value='NH'>NH</option>
                    <option value='NJ'>NJ</option>
                    <option value='NM'>NM</option>
                    <option value='NV'>NV</option>
                    <option value='NY'>NY</option>
                    <option value='ND'>ND</option>
                    <option value='OH'>OH</option>
                    <option value='OK'>OK</option>
                    <option value='OR'>OR</option>
                    <option value='PA'>PA</option>
                    <option value='RI'>RI</option>
                    <option value='SC'>SC</option>
                    <option value='SD'>SD</option>
                    <option value='TN'>TN</option>
                    <option value='TX'>TX</option>
                    <option value='UT'>UT</option>
                    <option value='VT'>VT</option>
                    <option value='VA'>VA</option>
                    <option value='WA'>WA</option>
                    <option value='WI'>WI</option>	
                    <option value='WV'>WV</option>
                    <option value='WY'>WY</option>
                </select>

                <label htmlFor='zipCode'>Zip Code</label>
                <input type='number' id='zipCode' defaultValue={user.zipCode} required/>

                <label htmlFor='password'>Password</label>
                <input type='password' id='password' required/>

                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password' id='confirmPassword' required/>

                <button type='submit'>Save User</button>
            </form>

            { error ? <>
                <span className='errorMessage'>{error}</span>
                <br />
            </> : null }
        </div>
    )
}

export default EditAccount;