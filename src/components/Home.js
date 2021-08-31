import React, { useContext, useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

import APIContext from '../context/APIContext';
import UserContext from '../context/UserContext';

const Home = () => {
    const [question, setQuestion] = useState(null);
    const [pendingTrivia, setPendingTrivia] = useState([]);
    const [synchronized, setSynchronized] = useState(false);
    
    const { api } = useContext(APIContext);
    const { user } = useContext(UserContext);
    
    const [triviaInfo, setTriviaInfo] = useState(null);
    const [submitInfo, setSubmitInfo] = useState(null);
    const [approvalInfo, setApprovalInfo] = useState(null);
    const [error, setError] = useState(null);

    // ## ANSWER FORM ##
    const submitCategoryForm = async evt => {
        evt.preventDefault();
        setTriviaInfo(null);
        setError(null);

        await getTriviaQuestionByCategory(evt.target.category.value);
    }

    const checkAnswer = async evt => {
        evt.preventDefault();
        setTriviaInfo(null);
        setError(null);

        if (question.answer.toString() === evt.target.name) setTriviaInfo('Correct!');
        else setTriviaInfo('Incorrect. Please, try again.');
    }
    
    const getTriviaQuestionByCategory = useCallback(async category => {
        setTriviaInfo(null);
        setError(null);

        let trivia = [];
        await Axios.get(`${api}/question/${category}`)
        .then(res => {
            if(res?.data?.data) trivia = res.data.data;
        })
        .catch(reason => {
            console.log(reason);
            if (reason?.response?.data?.error) setError(reason.response.data.error);
            else setError(reason.message);
        });

        if (trivia.length) setQuestion(trivia[Math.floor(Math.random() * trivia.length)]);
        else setTriviaInfo('There are no questions in this category. You can add one below.');
    }, [api]);

    // ## SUBMIT FORM ##
    const submitTriviaQuestion = async evt => {
        evt.preventDefault();
        setSubmitInfo(null);
        setError(null);
        
        await Axios.post(`${api}/question/create`, {
            email: user.email,
            token: user.token,
            category: evt.target.category.value,
            question: evt.target.question.value,
            answer: evt.target.answer.value
        })
        .then(res => {
            if (res?.data?.message) setSubmitInfo(res.data.message);
            evt.target.category.value = 9;
            evt.target.question.value = '';
            evt.target.answer.forEach(radioBtn => { if (radioBtn?.checked) radioBtn.checked = false });
            console.log(evt.target.answer);
        })
        .catch(reason => {
            console.log(reason);
            if (reason?.response?.data?.error) setError(reason.response.data.error);
            else setError(reason.message);
        });
        
        await getPendingTrivia();
    }

    // ## APPROVAL FORM ##
    const getPendingTrivia = useCallback(async () => {
        await Axios.get(`${api}/question/pending`)
        .then(res => {
            if (res?.data?.data) setPendingTrivia(res.data.data);
        })
        .catch(reason => {
            console.log(reason);
            if (reason?.response?.data?.error) setError(reason.response.data.error);
            else setError(reason.message);
        });
    }, [api]);

    const updateTriviaQuestionApproval = async (trivia, approved) => {
        setApprovalInfo(null);
        setError(null);
        
        await Axios.put(`${api}/question/${approved? 'approve' : 'reject'}/${trivia._id}`, {
            email: user.email,
            token: user.token
        })
        .then(async res => {
            if (res?.data?.message) await setApprovalInfo(res.data.message);
            await getPendingTrivia();
        })
        .catch(reason => {
            console.log(reason);
            if (reason?.response?.data?.error) setError(reason.response.data.error);
            else setError(reason.message);
        });
    }

    useEffect(() => {
        getPendingTrivia();
        setSynchronized(true);
        getTriviaQuestionByCategory(9);
    }, [getPendingTrivia, synchronized, getTriviaQuestionByCategory]);

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
                    <br/>

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
                                <th>Hours Since</th>
                                <th>Question</th>
                                <th>Correct Answer</th>
                                <th>Approve</th>
                                <th>Reject</th>
                                <th><button onClick={() => getPendingTrivia()}>Refresh</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            { pendingTrivia.map(trivia => {
                                let hoursSince = Math.round(Math.abs(new Date().getTime() - trivia.createdAt) / 36e5);
                                return (
                                    <tr className='pendingTrivia' key={trivia.question}>
                                        <td className={`pendingTriviaTimeSince ${hoursSince >= 20? 'errorMessage' : ''}`}>{hoursSince}</td>
                                        <td className='pendingTriviaQuestion'>{trivia.question}</td>
                                        <td className='pendingTriviaAnswer'>{trivia.answer.toString()}</td>
                                        <td className='pendingTriviaApprove'><button onClick={() => updateTriviaQuestionApproval(trivia, true)}>Approve</button></td>
                                        <td className='pendingTriviaReject'><button onClick={() => updateTriviaQuestionApproval(trivia, false)}>Reject</button></td>
                                        {/* <td className='pendingTriviaTimeSince'>{trivia.createdAt}</td> */}
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>
                    <br/>

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