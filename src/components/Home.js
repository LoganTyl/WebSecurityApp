import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    state = {
        isSignedIn: true,
        isAdmin: false,
        pendingQuestions: []
    }

    componentDidMount() {
        // Insert db check to see if user is logged in; Set isSignedIn to true if so
    }

    submitQuestion() {

    }

    render(){
        if(this.state.isSignedIn){
            return (
                <>
                    <div className='container'>
                        <div className='homeHeaders'>
                            <a href='/editAccount'>Edit Your Account</a>
                            <a href='/signIn'>Log Out</a>
                        </div>
                        <div className='randomTriviaContainer'>
                            {/* <!-- TODO: Have a 50/50 roll of either pulling the question from the api or the database if the db is not empty -->
                            <!-- * Thinking of doing only True/False questions--> */}
                            <h3>Random Question</h3>
                            <p className='triviaQuestion'>Hello World</p>
                            <button type='button' name='true'>True</button>
                            <button type='button' name='false'>False</button>
                        </div>
        
                        <div className='submitTriviaQuestions'>
                            <h3>Submit Your Own Question</h3>
                            <form class='submitTriviaForm'>
                                <label htmlFor='category'>Question Category:</label>
                                <select name='questionCategory' id='category'>
                                    <option value='9'>General Knowledge</option>
                                    <option value='10'>Entertainment: Books</option>
                                    <option value='11'>Entertainment: Film</option>	
                                    <option value='12'>Entertainment: Music</option>
                                    <option value='13'>Entertainment: Musicals & Theatres</option>
                                    <option value='14'>Entertainment: Television</option>
                                    <option value='15'>Entertainment: Video Games</option>
                                    <option value='16'>Entertainment: Board Games</option>
                                    <option value='17'>Science & Nature</option>
                                    <option value='18'>Science: Computers</option>
                                    <option value='19'>Science: Mathematics</option>
                                    <option value='20'>Mythology</option>
                                    <option value='21'>Sports</option>
                                    <option value='22'>Geography</option>
                                    <option value='23'>History</option>
                                    <option value='24'>Politics</option>
                                    <option value='25'>Art</option>
                                    <option value='26'>Celebrities</option>
                                    <option value='27'>Animals</option>
                                    <option value='28'>Vehicles</option>
                                    <option value='29'>Entertainment: Comics</option>
                                    <option value='30'>Science: Gadgets</option>
                                    <option value='31'>Entertainment: Japanese Anime & Manga</option>
                                    <option value='32'>Entertainment: Cartoon & Animations</option>
                                </select>
        
                                <label htmlFor='question'>Question</label>
                                <input type='text' id='question' placeholder='Mickey Mouse is owned by Disney'/>
        
                                <label htmlFor='trueOrFalse'>Select the correct answer:</label>
                                <div className="radioBtnDiv">
                                    <input type='radio' id='true' value='true' name='trueOrFalse' />
                                    <label for='true'>True</label>
                                </div>
                                <div className="radioBtnDiv">                                    
                                    <input type='radio' id='false' value='false'  name='trueOrFalse'/>
                                    <label for='false'>False</label>
                                </div>
        
                                <button type='submit' onClick={this.submitQuestion()}>Submit Question</button>
                            </form>
                        </div>
                        
                        {this.state.isAdmin ? 
                            <div className='approveTriviaTable'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Question</th>
                                            <th>Correct Answer</th>
                                            <th>Approve</th>
                                            <th>Deny</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.pendingQuestions.map((pendingQuestion) => {
                                                return (
                                                    <div className='pendingQuestionContainer'>
                                                        {/* <div className='pendingQuestionQuestion'>{pendingQuestion.question}</div>
                                                        <div className='pendingQuestionAnswer'>{pendingQuestion.correct_answer}</div>
                                                        <div className='pendingQuestionApprove' onClick={() => approveQuestion(pendingQuestion)}>Approve</div>
                                                        <div className='pendingQuestionDeny' onClick={() => denyQuestion(pendingQuestion)}>Deny</div> */}
                                                    </div>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div> : null
                        }
                    </div>
                </>
            )
        }
        else{
            return <Redirect to='/signIn'/>
        }
    }
}

export default Home;