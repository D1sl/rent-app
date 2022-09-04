// Mutations
import { useState } from 'react';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState }
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <div className="container">
            <div className="mobile-container">
                <h1>Sign up</h1>
                <p>Already have an account? <Link to="/login">Sign in</Link>!</p>
                <form className="authform form-stacked" onSubmit={handleFormSubmit}>
                    <div className='inputs'>
                        <input
                            className="form-input input-group"
                            placeholder="Username"
                            name="username"
                            type="username"
                            id="username"
                            value={formState.username}
                            onChange={handleChange}
                        />
                        <input
                            className="form-input input-group"
                            placeholder="Email"
                            name="email"
                            type="email"
                            id="email"
                            value={formState.email}
                            onChange={handleChange}
                        />
                        <input
                            className="form-input input-group"
                            placeholder="Password"
                            name="password"
                            type="password"
                            id="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="button btn-action" type="submit">
                        Sign Up
                    </button>
                </form>
                {error && <div>Sign up failed</div>}
            </div>
        </div>
    )
};

export default Signup;