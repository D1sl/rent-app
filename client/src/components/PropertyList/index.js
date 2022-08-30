// React
import { Link } from 'react-router-dom';

// Style
import './style.css';

const PropertyList = ({ properties, title }) => {
    if (!properties.length) {
        return <h3>No properties yet</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            <div className='main-property-list'>
                {properties &&
                    properties.map(property => (
                        <div key={property._id}>
                            <Link to={`/property/${property._id}`}>
                                <div className="main-property-list-item">
                                    <div className="property-list-image">
                                        <img src="https://api.lorem.space/image/house" className='property-list-image-element' />
                                    </div>
                                    <h2 className="property-list-item-title">{property.address.address1}</h2>
                                    <p className="property-list-item-description">{property.address.zipPostcode}{", "}{property.address.city}</p>
                                    <p className="property-list-item-description">{"$"} {property.rent}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default PropertyList;