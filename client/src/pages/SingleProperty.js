// React
import { useParams } from 'react-router-dom';

// Queries
import { useQuery } from '@apollo/client';
import { QUERY_PROPERTY } from '../utils/queries';

// Style
import './style.css';

const SingleProperty = () => {
    const { id: propertyId } = useParams();

    const { loading, data } = useQuery(QUERY_PROPERTY, {
        variables: { id: propertyId }
    });

    const property = data?.property || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='container'>
            <div className='content'>
                <div className='property-quickdetails'>
                    <h1>{property.propertyTitle}</h1>
                    <p className='property-rent'>$ {property.rent} / mo</p>
                </div>
                <div className='property-image-box'>
                    <img src="https://api.lorem.space/image/house?w=1000" />
                </div>
                <div className='property-features'>
                    <div className='property-feature-column'>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Rent</p>
                            <p className='feature-content'>xxxx / month</p>
                        </div>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Available from</p>
                            <p className='feature-content'>xx/xx/xxxx</p>
                        </div>
                    </div>
                    <div className='property-feature-column'>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Space</p>
                            <p className='feature-content'>xx m2</p>
                        </div>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Rooms</p>
                            <p className='feature-content'>xx</p>
                        </div>
                    </div>
                    <div className='property-feature-column'>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Floor</p>
                            <p className='feature-content'>2</p>
                        </div>
                    </div>
                    <div className='property-feature-column'>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Year built</p>
                            <p className='feature-content'>xxxx</p>
                        </div>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Building type</p>
                            <p className='feature-content'>xxxxxxx</p>
                        </div>
                    </div>
                    <div className='property-feature-column'>
                        <div className='property-feature-row'>
                            <p className='feature-title'>Area</p>
                            <p className='feature-content'>xxxxx</p>
                        </div>
                        <div className='property-feature-row'>
                            <p className='feature-title'>City</p>
                            <p className='feature-content'>xxxxxx</p>
                        </div>
                    </div>
                </div>
                <p>{property.address.address1}</p>
                <p>{property.address.address2}</p>
                <p>{property.address.address3}</p>
                <p>{property.address.zipPostcode}{" "}{property.address.city}</p>
                <p>{property.address.state}</p>
                <p>{property.address.country}</p>
            </div>
        </div>
    )
}

export default SingleProperty;