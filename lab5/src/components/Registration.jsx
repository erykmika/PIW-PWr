import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../firebase.utils';
import validator from 'validator';

const handleRegister = (credentials) => {
    if (!validator.isEmail(credentials.email) || credentials.password.length < 6) {
        alert("Invalid email or password (less than 6 characters");
        return;
    }
    signUp(credentials.email, credentials.password);
    console.log("User created");
};

const RegistrationForm = ({ onRegister }) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ email, password });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
};

export { handleRegister };
export default RegistrationForm;
