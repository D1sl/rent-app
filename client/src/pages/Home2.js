import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';

import { QUERY_USER, QUERY_ME, QUERY_PROPERTIES } from '../utils/queries';

import PropertyList from '../components/PropertyList';

const Home2 = () => {
    const { loading, data } = useQuery(QUERY_ME);
    
    const user = data?.me || data?.user || {};

    const properties = data?.properties || [];


    if (loading) {
        return <div>Loading...</div>
    }

    console.log(user.userStatus)

    return (
        <div className='container'>
            <div className='mobile-container'>
                <div className='profile-container'>
                    <div className='profile-left'>
                        <div className='user-details'>
                            <img src="https://api.lorem.space/image/face?w=150&h=150" alt="profile image" />
                            <ul>
                                <li>Member since {user.memberSince}</li>
                                {user.properties.length ? (<li>{user.properties.length} {user.properties.length > 1 ? `Properties` : "Property"}</li>) : null}
                                <li>5 Tenants</li>
                            </ul>
                        </div>
                    </div>
                    <div className='profile-right'>
                        <h1>
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

export default Home2;