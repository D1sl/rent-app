// Mutations
import { useState } from 'react';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <div className="container">
            <div className="mobile-container">
                <h1>Sign in</h1>
                <p>Don't have an account yet? <Link to="/signup">Sign up today</Link>!</p>
                <form className="authform form-stacked" onSubmit={handleFormSubmit}>
                    <input
                        className="form-input"
                        placeholder="Email"
                        name="email"
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        placeholder="Password"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button className="button btn-action" type="submit">
                        Sign In
                    </button>   
                </form>
                {error && <div>Sign in failed</div>}
            </div>
        </div>
    )
};

export default Login;