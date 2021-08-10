import React, {Component} from 'react';
import ReactDOM, { render } from 'react-dom';

class SignUp extends Component {
    state = {
        fname: '',
        lname: '',
        street: '',
        city: '',
        us_State: '',
        zipcode: '',
        email: '',
        isEmailValid: false,
        password: '',
        confirmPassword: '',
        phone: '',
        isSamePassword: true
    }

    checkFName(event){
        this.setState({
            fname: event.target.value
        })
    }

    checkLName(event){
        this.setState({
            lname: event.target.value
        })
    }

    checkStreet(event){
        this.setState({
            street: event.target.value
        })
    }

    checkCity(event){
        this.setState({
            city: event.target.value
        })
    }

    checkState(event) {
        this.setState({
            us_State: event.target.value
        })
    };

    checkZip(event){
        this.setState({
            zipcode: event.target.value
        })
    }

    checkEmail(event){
        let email_validator_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email_validator_regex.test(event.target.value)){
            this.setState({
                email: event.target.value,
                isEmailValid: true
            })
        }
        else{
            this.setState({
                isEmailValid: false
            })
        }
    }

    checkPassword(event){
        this.setState({
            password: event.target.value
        })
    }

    checkIfSamePassword(event){
        this.setState({
            confirmPassword: event.target.value
        });
        if(this.state.password === this.state.confirmPassword){
            this.setState({
                isSamePassword: true
            })
        }
        else{
            this.setState({
                isSamePassword: false
            })
        }
    }

    checkPhone(event){
        this.setState({
            phone: event.target.value
        })
    }

    signUpUser(){
        fetch('https://5s65q9qmwk.execute-api.us-west-1.amazonaws.com/api/user/create',{
            method: "POST",
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
        .then(data => console.log(data))
        // window.location.href = "/signIn";
    }
//validate takes email and password
//update is same as create but only email and password are required
    render(){
        return (
            <>
                <div className="container">
                    <a href="signIn">Back</a>
                    <h1>Sign Up</h1>
                    <div className="signUpFields">
                        <label htmlFor="fNameSignUp">First Name:</label>
                        <input type="text" className="nameInput" id="fNameSignUp" placeholder="John" minLength="2" value={this.state.fname} onChange={this.checkFName()}/>
                        {/* <span className="errorMessage" hidden>Invalid name!</span> */}
    
                        <label htmlFor="lNameSignUp">Last Name:</label>
                        <input type="text" className="nameInput" id="lNameSignUp" placeholder="Doe" minLength="2" value={this.state.lname} onChange={this.checkLName()}/>
                        {/* <span className="errorMessage" hidden>Invalid name!</span> */}
    
                        <label htmlFor="addressSignUp">Address:</label>
                        <input type="text" className="addressInput" id="addressSignUp" placeholder="111 Faux Street" value={this.state.street} onChange={this.checkStreet()}/>
                        {/* <span className="errorMessage" hidden>Invalid address!</span> */}
    
                        <label htmlFor="citySignUp">City:</label>
                        <input type="text" className="citySignUp" id="citySignUp" placeholder="Salt Lake City" value={this.state.city} onChange={this.checkCity}/>
                        {/* <span className="errorMessage" hidden>Invalid city!</span> */}
    
                        <label htmlFor="stateSignUp">State:</label>
                        <select name="stateSelect" id="stateSignUp" value={this.state.us_State} onChange={this.checkState()}>
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
                        <input type="number" className="zipSignUp" id="zipSignUp" placeholder="12345" maxlength="5" value={this.state.zipcode} onChange={this.checkZip()}/>
                        {/* <span className="errorMessage">Invalid zip code!</span> */}
    
                        <label htmlFor="emailSignUp">Email:</label>
                        <input type="email" className="emailInput" id="emailSignUp" placeholder="johndoe@gmail.com" value={this.state.email} onChange={this.checkEmail()}/>
                        {
                            this.state.isEmailValid ?
                            <span className="errorMessage">Invalid email!</span> :
                            null
                        }

                        
                        <label htmlFor="passwordSignUp">Password:</label>
                        <input type="text" className="addressInput" id="addressSignUp" minLength="10" value={this.state.password} onChange={this.checkPassword()}/>
                        {/* <span className="errorMessage" hidden>Invalid password!</span> */}
    
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="text" className="confirmPasswordInput" id="confirmPassword" minLength="10" value={this.state.confirmPassword} onChange={this.checkIfSamePassword()}/>
                        {
                            this.isSamePassword ?
                            null :
                            <span className="errorMessage">Passwords do not match!</span>
                        }
    
                        <label htmlFor="phoneNumberSignUp">Phone:</label>
                        <input type="tel" className="phoneNumberInput" id="phoneNumberSignUp" placeholder="111-222-3333" value={this.state.phone} onChange={this.checkPhone()}/>
                        {/* <span className="errorMessage" hidden>Invalid phone number!</span> */}
                        
                        {/* TODO: Get button to redirect to /signIn */}
                        <button type="submit" className="signUpBtn" onClick={() => this.signUpUser()}>Sign Up</button>
                    </div>
                </div>
            </>
        )
    }
}

export default SignUp;