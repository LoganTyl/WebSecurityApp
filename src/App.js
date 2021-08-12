import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EditAccount from './components/EditAccount';
import Home from './components/Home';

import APIContext from './context/APIContext';
import UserContext from './context/UserContext';

const App = () => {
    const [api, setApi] = useState('http://localhost:3000/api');
    const [user, setUserState] = useState(JSON.parse(localStorage.getItem('user')));

    const setUser = value => {
        console.log('set user local storage: ', value);
        setUserState(value);
        if (value) localStorage.setItem('user', JSON.stringify(value));
        else localStorage.removeItem('user');
    }

    return (
        <Router>
            <APIContext.Provider value={{ api, setApi }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <div className='application'>
                        <Switch>
                            <Redirect exact from='/' to='/home' />
                            <Route exact path='/signIn'>
                                <SignIn/>
                            </Route>
                            <Route exact path='/signUp'>
                                <SignUp/>
                            </Route>
                            <Route exact path='/home'>
                                <Home/>
                            </Route>
                            <Route exact path='/editAccount'>
                                <EditAccount/>
                            </Route>
                            <Redirect exact from='*' to='/' />
                        </Switch>
                    </div>
                </UserContext.Provider>
            </APIContext.Provider>
        </Router>
    );
}

export default App;