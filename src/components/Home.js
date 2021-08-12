import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

import APIContext from '../context/APIContext';
import UserContext from '../context/UserContext';

const Home = () => {
    const [pendingTrivia, setPendingTrivia] = useState([]);

    const { api } = useContext(APIContext);
    const { user } = useContext(UserContext);

    const [error, setError] = useState(null);

    // TODO remove me
    console.log(user);

    const submitTriviaQuestion = async evt => {
        evt.preventDefault();

        await Axios.post(`${api}/question/create`, {
            category: evt.target.category.value,
            question: evt.target.question.value,
            answer: evt.target.answer.value
        })
        .catch(reason => {
            setError(reason.response.data.error);
        });
        
        await Axios.get(`${api}/question/pending`)
        .then(res => {
            setPendingTrivia(res.data);
        })
        .catch(reason => {
            setError(reason.response.data.error);
        });
    }

    const updateTriviaQuestionApproval = async (trivia, approved) => {
        console.log(`Accept Trivia Question '${trivia.question}' (${trivia.answer})`);
        
        await Axios.put(`${api}/question/${approved? 'approve' : 'reject'}/${trivia._id}`)
        .catch(reason => {
            setError(reason.message);
            console.log(reason.message);
        });
    }

    if (!(user && user._id)) return <Redirect to='/signIn' />
    return (
        <div className='container'>
            <div className='homeHeaders'>
                <a href='/editAccount'>Edit Your Account</a>
                <a href='/signIn'>Log Out</a>
            </div>
            
            <div className='randomTriviaContainer'>
                {/* TODO: Have a 50/50 roll of either pulling the question from the api or the database if the db is not empty
                    Thinking of doing only True/False questions */}
                <h3>Random Question</h3>
                <p className='triviaQuestion'>Hello World</p>
                <button type='button' name='true'>True</button>
                <button type='button' name='false'>False</button>
            </div>

            <form className='triviaQuestionForm' onSubmit={submitTriviaQuestion}>
                <h3>Submit Your Own Question</h3>
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
                <br/>

                <label htmlFor='question'>Question</label>
                <input type='text' id='question' placeholder='Mickey Mouse is owned by Disney'/>
                <br/>

                <label htmlFor='answer'>Select the correct answer:</label>
                <div className='radioBtnDiv'>
                    <input type='radio' id='answer' value='true'/>
                    <span>True</span>
                    <input type='radio' id='answer' value='false'/>
                    <span>False</span>
                </div>
                <br/>

                <button type='submit'>Submit Question</button>
            </form>
            
            { user.isAdmin ? 
                <div className='approveTriviaQuestions'>
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Correct Answer</th>
                                <th>Approve</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            { pendingTrivia.map(trivia => {
                                return (
                                    <tr className='pendingTrivia'>
                                        <td className='pendingTriviaQuestion'>{trivia.question}</td>
                                        <td className='pendingTriviaAnswer'>{trivia.answer}</td>
                                        <td className='pendingTriviaApprove' onClick={() => updateTriviaQuestionApproval(trivia, true)}>Approve</td>
                                        <td className='pendingTriviaReject' onClick={() => updateTriviaQuestionApproval(trivia, false)}>Reject</td>
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>
                </div>
            : null }

            { error ?
                <>
                    <span className='errorMessage'>{error}</span>
                    <br />
                </>
            : null }
        </div>
    );
}

export default Home;