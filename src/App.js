import logo from './logo.svg';
import './App.css';
  
import './styles/style.scss';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EditAccount from './components/EditAccount';
import Home from './components/Home';

// import UserContext from './context/userContext';

const App = () => {
    // const [userData, setUserData] = useState({ user: {} });

    return (
        <Router>
            {/* <UserContext.Provider value={{ userData, setUserData }}> */}
                <div className="application">
                    <Switch>
                        <Redirect exact from="/" to="/signIn" />
                        <Route exact path="/signIn">
                            <SignIn/>
                        </Route>
                        <Route exact path="/signUp">
                            <SignUp/>
                        </Route>
                        <Route exact path="/home">
                            <Home/>
                        </Route>
                        <Route exact path="/editAccount">
                            <EditAccount/>
                        </Route>
                        <Redirect exact from="*" to="/" />
                    </Switch>
                </div>
            {/* </UserContext.Provider> */}
        </Router>
    );
}

export default App;
