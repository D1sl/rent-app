const PropertyList = ({ properties, title })=> {
    if (!properties.length) {
        return <h3>No properties yet</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            {properties && 
            properties.map(property => (
                <div key={property._id}>
                    <h2>{property.propertyTitle}</h2>
                    <p>{property.address.address1}</p>
                    <p>{property.address.address2}</p>
                    <p>{property.address.address3}</p>
                    <p>{property.address.zipPostcode}{", "}{property.address.city}</p>
                    <p>{property.address.country}</p>
                </div>
            ))}
        </div>
    )
}

export default PropertyList;