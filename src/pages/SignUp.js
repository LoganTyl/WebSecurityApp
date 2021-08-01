import '../styles/style.scss';

import React, {Component} from 'react';
import ReactDOM, { render } from 'react-dom';

class SignUp extends Component {
    render(){
        return (
            <>
                <div className="container">
                    <a href="signIn">Back</a>
                    <h1>Sign Up</h1>
                    <div className="signUpFields">
                        <label htmlFor="fNameSignUp">First Name:</label>
                        <input type="text" className="nameInput" id="fNameSignUp" placeholder="John" minLength="2"/>
                        <span className="errorMessage" hidden>Invalid name!</span>
    
                        <label htmlFor="lNameSignUp">Last Name:</label>
                        <input type="text" className="nameInput" id="lNameSignUp" placeholder="Doe" minLength="2"/>
                        <span className="errorMessage" hidden>Invalid name!</span>
    
                        <label htmlFor="addressSignUp">Address:</label>
                        <input type="text" className="addressInput" id="addressSignUp" placeholder="111 Faux Street"/>
                        <span className="errorMessage" hidden>Invalid address!</span>
    
                        <label htmlFor="citySignUp">City:</label>
                        <input type="text" className="citySignUp" id="citySignUp" placeholder="Salt Lake City"/>
                        <span className="errorMessage" hidden>Invalid city!</span>
    
                        <label htmlFor="stateSignUp">State:</label>
                        <select name="stateSelect" id="stateSignUp">
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
    
                        <label htmlFor="zipSignUp">Zip Code:</label>
                        <input type="number" className="zipSignUp" id="zipSignUp" placeholder="12345" maxlength="5"/>
                        <span className="errorMessage" hidden>Invalid zip code!</span>
    
                        <label htmlFor="emailSignUp">Email:</label>
                        <input type="email" className="emailInput" id="emailSignUp" placeholder="johndoe@gmail.com"/>
                        <span className="errorMessage" hidden>Invalid email!</span>
                        
                        <label htmlFor="passwordSignUp">Password:</label>
                        <input type="text" className="addressInput" id="addressSignUp" minLength="10"/>
                        <span className="errorMessage" hidden>Invalid password!</span>
    
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="text" className="confirmPasswordInput" id="confirmPassword" minLength="10"/>
                        <span className="errorMessage" hidden>Passwords do not match!</span>
    
                        <label htmlFor="phoneNumberSignUp">Phone:</label>
                        <input type="tel" className="phoneNumberInput" id="phoneNumberSignUp" placeholder="111-222-3333"/>
                        <span className="errorMessage" hidden>Invalid phone number!</span>
                        
                        {/* TODO: Get button to redirect to /signIn */}
                        <button type="submit" className="signUpBtn">Sign Up</button>
                    </div>
                </div>
            </>
        )
    }
}

export default SignUp;