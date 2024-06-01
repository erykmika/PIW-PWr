import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signIn } from "../firebase.utils"
import { useOutletContext } from 'react-router-dom';

const handleLogin = (credentials) => {
    signIn(credentials.email, credentials.password);
    console.log("Current user (email) " + auth.currentUser);
};

const LoginForm = ({ onLogin }) => {
    const [loggedUser, setloggedUser] = useOutletContext();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
        setloggedUser(auth.currentUser);
        console.log(loggedUser);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export { handleLogin };
export default LoginForm;