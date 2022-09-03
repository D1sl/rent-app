import { QUERY_PROPERTIES, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

// Components
import PropertyList from '../components/PropertyList';
// import Popup from '../components/Popup';


const Home = () => {
    const { loading, data } = useQuery(QUERY_PROPERTIES);
    const { uLoading, uData } = useQuery(QUERY_ME);
    const userData = uData?.me || [];

    const properties = data?.properties || [];

    return (
        <div>
            {/* <Popup /> */}
            <div className='container'>
                <div className='mobile-container'>
                    {/* {loggedIn && userData ? (
                        <div>
                            <h1>Your properties</h1>
                            <PropertyList properties={userData.me.properties} title="Your properties" />
                        </div>
                    ) : null} */}
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