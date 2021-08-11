import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EditAccount from './components/EditAccount';
import Home from './components/Home';

import UserContext from './context/UserContext';

const App = () => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState({
        email: 'jeff@gmail.com',
        firstName: 'Jeffrey',
        lastName: 'Rehm',
        isAdmin: true
    });

    return (
        <Router>
            <UserContext.Provider value={{ user, setUser }}>
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
            </UserContext.Provider>
        </Router>
    );
}

export default App;
