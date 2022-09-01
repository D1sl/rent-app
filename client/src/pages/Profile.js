import { useParams } from 'react-router-dom';

// import PropertyList from '../components/PropertyList';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import PropertyList from '../components/PropertyList';

const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });

    const user = data?.user || {};

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(user)

    return (
        <div className='container'>
            <div className='mobile-container'>
                <div className='profile-container'>
                    <div className='profile-left'>
                        <div className='user-details'>
                            <img src="https://api.lorem.space/image/face?w=150&h=150" alt="profile image" />
                            <ul>
                                <li>Member since {user.memberSince}</li>
                                <li>{user.properties.length} {user.properties.length > 1 ? `Properties` : "Property"}</li>
                                <li>5 Tenants</li>
                            </ul>
                        </div>
                    </div>
                    <div className='profile-right'>
                        <h1>Hi! I'm {user.firstName}!</h1>
                        <p>{user.bio}</p>
                        <PropertyList properties={user.properties} title={`${user.firstName}'s properties`} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;