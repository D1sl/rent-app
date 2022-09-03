import { useQuery } from '@apollo/client';
import { QUERY_PROPERTIES, QUERY_ME_BASIC } from '../utils/queries';

import Auth from '../utils/auth';

// Components
import PropertyList from '../components/PropertyList';

const Home = () => {
    const { loading, data } = useQuery(QUERY_PROPERTIES);
    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const properties = data?.properties || [];
    console.log(userData)

    const loggedIn = Auth.loggedIn();

    return (
        <div>
            <div className='container'>
                <div className='mobile-container'>
                    {loggedIn && userData ? (
                        <div>
                            <h1>Your properties</h1>
                            <PropertyList properties={userData.me.properties} title="Your properties" />
                        </div>
                    ) : null}
                    <div className='propertylist'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <PropertyList properties={properties} title="List of all properties" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;