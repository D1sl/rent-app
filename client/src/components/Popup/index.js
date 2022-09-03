import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';



import './style.css';

import Auth from '../../utils/auth';

const Popup = () => {

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || [];

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    if (Auth.loggedIn() && userData.userStatus === "incomplete") {
        return (
            <div className='popup'>
                <div className='popup-body'>
                    <h1>Welcome to Rent App!</h1>
                    <p>Please complete your profile to continue or <a href="/" onClick={logout}>sign out</a>.</p>
                    <form className='form-stacked'>
                        <input className='form-input' placeholder='First name' />
                        <input className='form-input' placeholder='Last name' />
                        <input className='form-input' placeholder='Phone number' />
                        <button className='button btn-action'>Save</button>
                    </form>
                </div>
            </div>
        );
    } else return (

        <>
        </>
    )
};

export default Popup;