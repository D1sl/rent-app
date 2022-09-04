import { useState } from 'react';

import { motion } from 'framer-motion';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';

import logo from '../../assets/img/logo.png';



import './style.css';

import Auth from '../../utils/auth';

const Popup = () => {

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || [];

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    const [formState, setFormState] = useState({ firstName: '', lastName: '', phone: '' });
    const [updateUser, { error }] = useMutation(UPDATE_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            _id: userData._id,
            ...formState,
            [name]: value,
        });
    };
    const handleFormSubmit = async event => {
        event.preventDefault();

        const id = userData._id
        try {
            const { data } = await updateUser({
                variables: {
                    id,
                    ...formState
                }
            });
            window.location.reload(false);
        } catch (e) {
            console.error(e);
        }
    };




    if (Auth.loggedIn() && userData.userStatus === "incomplete") {
        return (
            <motion.div className='popup'
                transition={{ duration: 1, delayChildren: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    initial={{ y: 3000 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delayChildren: 0.5, ease: "easeOut" }}
                    className='popup-body'
                >
                    <div className='popup-header'>
                        <img src={logo} className="logo" alt="rent app logo" />
                        <h3>Welcome to Rent!</h3>
                        <p>Please complete your registration or <a href="/" onClick={logout}>sign out</a>.</p>
                    </div>
                    <form className='form-stacked incompleteForm' onSubmit={handleFormSubmit}>
                        <div className='inputs'>
                            <input
                                className='form-input input-group'
                                onChange={handleChange}
                                name='firstName'
                                placeholder='First name'
                                type='text'
                                id='lastName'
                            />
                            <input
                                className='form-input input-group'
                                onChange={handleChange}
                                name='lastName'
                                placeholder='Last name'
                                type='text'
                                id='lastName'
                            />
                            <input
                                className='form-input input-group'
                                onChange={handleChange}
                                name='phone'
                                placeholder='Phone number'
                                type='text'
                                id='phone'
                            />
                        </div>
                        <button className='button btn-action'>Save</button>
                    </form>
                </motion.div>
            </motion.div>
        );
    } else return (

        <>
        </>
    )
};

export default Popup;