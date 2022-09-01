import { useParams } from 'react-router-dom';

// import PropertyList from '../components/PropertyList';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
    const { id: userParam } = useParams();
    console.log(userParam)
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { id: userParam }
    });

    const user = data?.user || {};

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(user)

    return (
        <div className='container'>
            <h2>Profile</h2>
        </div>
    )
};

export default Profile;