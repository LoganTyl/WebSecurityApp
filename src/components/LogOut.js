import { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../context/UserContext';

const LogOut = () => {
    const { user, setUser } = useContext(UserContext);
    
    useEffect(() => {
        if (user) setUser(null);
    });

    return <Redirect to='/signIn' />
}

export default LogOut;