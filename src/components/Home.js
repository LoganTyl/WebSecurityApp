import React, { useContext, useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

import APIContext from '../context/APIContext';
import UserContext from '../context/UserContext';

const Home = () => {
    // I treat question as singular and trivia as plural (questions)
    const [question, setQuestion] = useState(null);
    const [pendingTrivia, setPendingTrivia] = useState([]);
    const [synchronized, setSynchronized] = useState(false);
    
    const { api } = useContext(APIContext);
    const { user } = useContext(UserContext);
    
    const [triviaInfo, setTriviaInfo] = useState(null);
    const [submitInfo, setSubmitInfo] = useState(null);
    const [approvalInfo, setApprovalInfo] = useState(null);
    const [error, setError] = useState(null);
    
    const getTriviaQuestionByCategory = async category => {
        let trivia = [];
        await Axios.get(`${api}/question/${category}`)
        .then(res => {
            if(res.data) trivia = res.data;
        })
        .catch(reason => {
            console.log(reason);
            if (reason.response.data.error) setError(reason.response.data.error);
        });

        if (trivia.length) setQuestion(trivia[Math.floor(Math.random() * trivia.length)]);
        else setTriviaInfo('There are no questions in this category. You can add one below.');
    }

    const submitCategoryForm = async evt => {
        evt.preventDefault();
        setTriviaInfo(null);
        await getTriviaQuestionByCategory(evt.target.category.value);
    }

    const checkAnswer = async evt => {
        setTriviaInfo(null);

        if (question.answer.toString() === evt.target.name) setTriviaInfo('Correct!');
        else setTriviaInfo('Incorrect. Please, try again.');
    }

    const getPendingTrivia = useCallback(async () => {
        setError(null);
        await Axios.get(`${api}/question/pending`)
        .then(res => {
            if (res.data) setPendingTrivia(res.data);
        })
        .catch(reason => {
            console.log(reason);
            if (reason.response.data.error) setError(reason.response.data.error);
        });
    }, [api]);

    const submitTriviaQuestion = async evt => {
        evt.preventDefault();

        await Axios.post(`${api}/question/create`, {
            email: user.email,
            token: user.token,
            category: evt.target.category.value,
            question: evt.target.question.value,
            answer: evt.target.answer.value
        })
        .then(res => {
            alert(res.message) // TODO use info
            setError(null);
        })
        .catch(reason => {
            console.log(reason);
            if (reason.response.data.error) setError(reason.response.data.error);
        });
        
        await getPendingTrivia();
    }

    useEffect(() => {
        getPendingTrivia();
        setSynchronized(true);
        // getTriviaQuestionByCategory(9);
    }, [getPendingTrivia, synchronized]);

    const updateTriviaQuestionApproval = async (trivia, approved) => {
        console.log(`${approved? 'Accept' : 'Reject'} Trivia Question '${trivia.question}' (${trivia.answer})`);
        
        await Axios.put(`${api}/question/${approved? 'approve' : 'reject'}/${trivia._id}`, {
            email: user.email,
            token: user.token
        })
        .then(async () => {
            await getPendingTrivia();
        })
        .catch(reason => {
            console.log(reason);
            if (reason.response.data.error) setError(reason.response.data.error);
        });
    }

    return (
        <div className='container'>
            <div className='homeHeaders'>
                <a href='/editAccount'>Edit Your Account</a>
                { (user && user._id) ?
                    <a href='/logOut'>Log Out</a>
                :
                    <a href='/signIn'>Sign In</a>
                }
            </div>
            
            <div className='randomTriviaContainer'>
                <h3>Get Trivia Question</h3>
                <form className='categoryForm' onSubmit={submitCategoryForm}>
                    <label htmlFor='category'>Category</label>
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

                    <button type='submit'>Get Question</button>
                </form>

                <h3>Answer Question</h3>
                { question ? <>
                    <p className='triviaQuestion'>{question.question}</p>
                    <button type='button' name='true' onClick={checkAnswer}>True</button>
                    <button type='button' name='false' onClick={checkAnswer}>False</button>
                    <br />
                    
                    { triviaInfo ? <>
                        <span className='infoMessage'>{triviaInfo}</span>
                        <br />
                    </> : null }
                </> : <>
                    { triviaInfo ? <>
                        <span className='infoMessage'>{triviaInfo}</span>
                        <br />
                    </> : <>
                        <span className='infoMessage'>Loading...</span>
                        <br />
                    </> }
                </> }
            </div>
        
            {(user && user.token) ?
                <form className='triviaQuestionForm' onSubmit={submitTriviaQuestion}>
                    <h3>Submit Your Own Question</h3>
                    <label htmlFor='category'>Category</label>
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
    
                    <label htmlFor='answer'>Select the correct answer</label>
                    <div className='radioBtnDiv'>
                        <input type='radio' id='answer' name="triviaAnswer" value='true'/>
                        <span>True</span>
                        <input type='radio' id='answer' name="triviaAnswer" value='false'/>
                        <span>False</span>
                    </div>
                    <br/>
    
                    <button type='submit'>Submit Question</button>

                    { submitInfo ? <>
                        <span className='infoMessage'>{submitInfo}</span>
                        <br />
                    </> : null }
                </form>
            : null }
            
            {(user && user.token && user.isAdmin) ?
                <div className='approveTriviaQuestions'>
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Correct Answer</th>
                                <th>Approve</th>
                                <th>Reject</th>
                                <th><button onClick={() => getPendingTrivia()}>Refresh</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            { pendingTrivia.map(trivia => {
                                return (
                                    <tr className='pendingTrivia' key={trivia.question}>
                                        <td className='pendingTriviaQuestion'>{trivia.question}</td>
                                        <td className='pendingTriviaAnswer'>{trivia.answer.toString()}</td>
                                        <td className='pendingTriviaApprove'><button onClick={() => updateTriviaQuestionApproval(trivia, true)}>Approve</button></td>
                                        <td className='pendingTriviaReject'><button onClick={() => updateTriviaQuestionApproval(trivia, false)}>Reject</button></td>
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>

                    { approvalInfo ? <>
                        <span className='infoMessage'>{approvalInfo}</span>
                        <br />
                    </> : null }
                </div>
            : null }

            { error ? <>
                <span className='errorMessage'>{error}</span>
                <br />
            </> : null }
        </div>
    );
}

export default Home;