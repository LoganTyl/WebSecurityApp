import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../context/UserContext';

const EditAccount = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(true);

    const submitEditUserForm = () => {
        // TODO remove AWS links and switch to custom back-end API
        fetch('https://5s65q9qmwk.execute-api.us-west-1.amazonaws.com/api/user/update', {
            method: "PUT",
            body: {
                "email": "",
                "password": "",
                "fname": "",
                "lname": "",
                "phone": "",
                "street": "",
                "city": "",
                "state": "",
                "zip_code": ""
            }
        })
        .then(data => console.log(data));
    }

    if (!this.state.isSignedIn) return <Redirect to="/signIn"/>
    else {
        return (
            <div className="container">
                <a href="signIn">Back</a>
                <h1>Sign Up</h1>
                <div className="EditFields">
                    <label htmlFor="fNameEdit">First Name:</label>
                    <input type="text" className="nameInput" id="fNameEdit" placeholder="John" minLength="2" value={this.state.fname} onChange={this.checkFName()}/>
                    {/* <span className="errorMessage" hidden>Invalid name!</span> */}

                    <label htmlFor="lNameEdit">Last Name:</label>
                    <input type="text" className="nameInput" id="lNameEdit" placeholder="Doe" minLength="2" value={this.state.lname} onChange={this.checkLName()}/>
                    {/* <span className="errorMessage" hidden>Invalid name!</span> */}

                    <label htmlFor="addressEdit">Address:</label>
                    <input type="text" className="addressInput" id="addressEdit" placeholder="111 Faux Street" value={this.state.street} onChange={this.checkStreet()}/>
                    {/* <span className="errorMessage" hidden>Invalid address!</span> */}

                    <label htmlFor="cityEdit">City:</label>
                    <input type="text" className="cityEdit" id="cityEdit" placeholder="Salt Lake City" value={this.state.city} onChange={this.checkCity}/>
                    {/* <span className="errorMessage" hidden>Invalid city!</span> */}

                    <label htmlFor="stateEdit">State:</label>
                    <select name="stateSelect" id="stateEdit" value={this.state.us_State} onChange={this.checkState()}>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AR">AR</option>	
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DC">DC</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="IA">IA</option>	
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="MA">MA</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>	
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="NC">NC</option>	
                        <option value="NE">NE</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>			
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WI">WI</option>	
                        <option value="WV">WV</option>
                        <option value="WY">WY</option>
                    </select>

                    <label htmlFor="zipEdit">Zip Code:</label>
                    <input type="number" className="zipEdit" id="zipEdit" placeholder="12345" maxlength="5" value={this.state.zipcode} onChange={this.checkZip()}/>
                    {/* <span className="errorMessage">Invalid zip code!</span> */}

                    <label htmlFor="emailSignUp">Email:</label>
                    <input type="email" className="emailInput" id="emailSignUp" placeholder="johndoe@gmail.com" value={this.state.email} onChange={this.checkEmail()} disabled/>
                    
                    <label htmlFor="passwordEdit">Password:</label>
                    <input type="text" className="addressInput" id="addressEdit" minLength="10" value={this.state.password} onChange={this.checkPassword()}/>
                    {/* <span className="errorMessage" hidden>Invalid password!</span> */}

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="text" className="confirmPasswordInput" id="confirmPassword" minLength="10" value={this.state.confirmPassword} onChange={this.checkIfSamePassword()}/>
                    {
                        this.isSamePassword ?
                        null :
                        <span className="errorMessage">Passwords do not match!</span>
                    }

                    <label htmlFor="phoneNumberEdit">Phone:</label>
                    <input type="tel" className="phoneNumberInput" id="phoneNumberEdit" placeholder="111-222-3333" value={this.state.phone} onChange={this.checkPhone()}/>
                    {/* <span className="errorMessage" hidden>Invalid phone number!</span> */}
                    
                    {/* TODO: Get button to redirect to /signIn */}
                    <button type="submit" className="EditBtn" onClick={() => this.editUser()}>Save User</button>
                </div>
            </div>
        )
    }
}

export default EditAccount;