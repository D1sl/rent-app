// React
import { Link } from 'react-router-dom';

// Style
import './style.css';

const PropertyList = ({ properties, title }) => {
    if (!properties.length) {
        return <h3>No properties yet</h3>
    }

    console.log(properties)

    return (
        <div>
            <h3>{title}</h3>
            <div className='main-property-list'>
                {properties &&
                    properties.map(property => (
                        <>
                        {/* Only show properties that are listed as published */}
                            {property.publishStatus === "published" ?
                                <div key={property._id}>
                                    <Link to={`/property/${property._id}`}>
                                        <div className="main-property-list-item">
                                            <div className="property-list-image">
                                                <img src="https://api.lorem.space/image/house" className='property-list-image-element' alt='preview' />
                                            </div>
                                            <h2 className="property-list-item-title">{property.address.addressLine1} {property.address.addressLine2}</h2>
                                            <p className="property-list-item-description">{property.address.postalCode}{", "}{property.address.addressLevel2}</p>
                                            <p className="property-list-item-description">{"$"} {property.rent}</p>
                                        </div>
                                    </Link>
                                </div>
                                : null}
                        </>
                    ))}
            </div>
        </div>
    )
}

export default PropertyList;