import '../styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import SignIn from './SignIn';
import EditAccount from './EditAccount';

const Home = () => {
    console.log('in react')

    return (
        <Router>
            <div className="container">
                <Link to="/editAccount">Edit Your Account</Link>
                <Link to="/signIn">Log Out</Link>
                <a href="editAccount.html"></a>
                <div className="randomTriviaContainer">
                    {/* <!-- TODO: Have a 50/50 roll of either pulling the question from the api or the database if the db is not empty -->
                    <!-- * Thinking of doing only True/False questions--> */}
                    <p clss="triviaQuestion"></p>
                    <button type="button" name="true">True</button>
                    <button type="button" name="false">False</button>
                </div>

                <div className="submitTriviaQuestions">
                    <form>
                        <label htmlFor="category">Question Category:</label>
                        <select name="questionCategory" id="category">
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>	
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals & Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime & Manga</option>
                            <option value="32">Entertainment: Cartoon & Animations</option>
                        </select>

                        <label htmlFor="question">Question</label>
                        <input type="text" id="question" placeholder="Mickey Mouse is owned by Disney"/>

                        <label htmlFor="trueOrFalse">Select the correct answer:</label>
                        <input type="radio" id="trueOrFalse" value="true"/>
                        <span>True</span>
                        <input type="radio" id="trueOrFalse" value="false"/>
                        <span>False</span>

                        <button type="submit">Submit Question</button>
                    </form>
                </div>

                {/* <!-- TODO: Make this table visible only to admin users --> */}
                <div className="approveTriviaTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Approve</th>
                                <th>Deny</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!--Table rows inserted here with button to approve or deny them--> */}
                        </tbody>
                    </table>
                </div>
                <Switch>
                    <Route path="/editAccount">
                        <EditAccount/>
                    </Route>
                    {/* TODO: Log out user at this point */}
                    <Route path="/signIn">
                        <SIgnIn/>    
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Home;