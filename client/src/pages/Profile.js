import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import PropertyList from '../components/PropertyList';

const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });
    
    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(user.userStatus)

    if (!user?.username) {
        return (
            <div className='container'>
                <div className='mobile-container'>
                    <h1>You need to be logged in to see this page.</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='mobile-container'>
                <div className='profile-container'>
                    <div className='profile-left'>
                        <div className='user-details'>
                            <img src="https://api.lorem.space/image/face?w=150&h=150" alt="profile" />
                            <ul>
                                <li>Member since {user.memberSince}</li>
                                {user.properties.length ? (<li>{user.properties.length} {user.properties.length > 1 ? `Properties` : "Property"}</li>) : null}
                                <li>5 Tenants</li>
                            </ul>
                        </div>
                    </div>
                    <div className='profile-right'>
                        <h1>
                            {userParam ? (`Hi! I'm ${user.firstName}!`) : ("Viewing your profile")}
                        </h1>
                        <p>{user.bio}</p>
                        <PropertyList properties={user.properties} title={`${user.firstName}'s properties`} />
                        <Link to="/list-your-property">List your property</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;