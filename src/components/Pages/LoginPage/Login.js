import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { Spinner } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { loginUser, isLoading, authError, signInUsingGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(field, value);
    }

    const handleGoogleSignIn = () => {
        signInUsingGoogle(location, navigate);
    }

    const handleSignIn = e => {
        // if (loginData.password !== loginData.password) {
        //     alert('Your Password did not match')
        //     return
        // }
        loginUser(loginData.email, loginData.password, location, navigate);
        e.preventDefault();
    }

    if (isLoading) {
        return <Spinner animation="border" variant="info" />
    }

    return (
        <div className="row mx-auto text-light loginBackground">
            <div>
                <form onSubmit={handleSignIn}>
                    <h1 className="text-info p-2">Please Login</h1>
                    <br />
                    <input className="px-4 py-1 rounded-pill" type="email" name="email" onChange={handleOnChange} placeholder="Enter Your Email" required />
                    <br /><br />
                    <input className="px-4 py-1 rounded-pill" type="password" name="password" onChange={handleOnChange} placeholder="Enter Your Password" id="" required />
                    <br /><br />
                    <input className="mt-3 w-50 btn btn-info rounded-3 m-auto" type="submit" value="Login" />
                </form>

                <br />
                <h5 className="text-danger">{authError}</h5>
                <br />
                <p>New to Our Site ? <Link to="/register">Please Register</Link></p>
                <div>------------------------------</div>
                <br />
                <button onClick={handleGoogleSignIn} className="btn btn-primary">Google SignIn <i className="fab text-warning fa-google"></i></button>
            </div>

        </div>
    );
};

export default Login;