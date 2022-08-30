import { useQuery } from '@apollo/client';
import { QUERY_PROPERTIES } from '../utils/queries';

// Components
import PropertyList from '../components/PropertyList';

const Home = () => {
    const { loading, data } = useQuery(QUERY_PROPERTIES);
    const properties = data?.properties || [];
    console.log(properties)

    return (
        <div>
            <div className='container'>
                <div className='propertylist'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PropertyList properties={properties} title="List of all properties" />
                    )}
                </div>
            </div>
        </div>
    )
};

export default Home;