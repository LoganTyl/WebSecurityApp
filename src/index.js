import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditAccount from './pages/EditAccount';
import Home from './pages/Home';


const App = () => {
    return (
        <Router>
            <>
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
            </>
        </Router>
    )
}

ReactDOM.render(<App />, document);