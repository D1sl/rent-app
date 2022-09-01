// React
import { useParams, useNavigate } from 'react-router-dom';

// Queries
import { useQuery } from '@apollo/client';
import { QUERY_PROPERTY } from '../utils/queries';

// Components
import LandlordInfo from '../components/LandlordInfo';

// Style
import './style.css';
import backIcon from '../assets/img/back-icon.png'

const SingleProperty = () => {

    const navigate = useNavigate();

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
                <div className='back-button' onClick={() => navigate(-1)}>
                    <img src={backIcon} className="ui-icon" alt="back icon" />
                </div>
                <div className='property-image-box'>
                    <img src="https://api.lorem.space/image/house?w=1000" />
                </div>
                <div className='mobile-container'>
                    <div className='property-quickdetails-mobile'>
                        <h1>{property.propertyTitle}</h1>
                        <p className='property-rent'>$ {property.rent} / mo</p>
                    </div>
                    <div className='property-features'>
                        <div className='property-feature-column'>
                            <div className='property-feature-row'>
                                <p className='feature-title'>Rent</p>
                                <p className='feature-content'>{property.rent} € / month</p>
                            </div>
                            <div className='property-feature-row'>
                                <p className='feature-title'>Available from</p>
                                <p className='feature-content'>{property.availableFrom}</p>
                            </div>
                        </div>
                        <div className='property-feature-column'>
                            <div className='property-feature-row'>
                                <p className='feature-title'>Living Area</p>
                                <p className='feature-content'>{property.livingArea}</p>
                            </div>
                            <div className='property-feature-row'>
                                <p className='feature-title'>Rooms</p>
                                <p className='feature-content'>{`${property.bedrooms}`}</p>
                            </div>
                        </div>
                        <div className='property-feature-column'>
                            <div className='property-feature-row'>
                                <p className='feature-title'>Floor</p>
                                <p className='feature-content'>{property.floor}</p>
                            </div>
                        </div>
                        <div className='property-feature-column'>
                            <div className='property-feature-row'>
                                <p className='feature-title'>Year built</p>
                                <p className='feature-content'>{property.yearBuilt}</p>
                            </div>
                            <div className='property-feature-row'>
                                <p className='feature-title'>Building type</p>
                                <p className='feature-content'>{property.buildingType}</p>
                            </div>
                        </div>
                        <div className='property-feature-column'>
                            <div className='property-feature-row'>
                                <p className='feature-title'>City</p>
                                <p className='feature-content'>{property.address.city}</p>
                            </div>
                        </div>
                    </div>
                    <LandlordInfo landlord={property.belongsTo} />
                    <h2>Basic information</h2>
                    <table>
                        <tr>
                            <th>Location</th>
                            <td>{property.address.address1}, {property.address.zipPostcode} {property.address.city}, {property.address.country}</td>
                        </tr>
                        <tr>
                            <th>Living area</th>
                            <td>{property.livingArea}</td>
                        </tr>
                        <tr>
                            <th>Room setup</th>
                            <td>{property.bedrooms} bed + {property.bathrooms} bath</td>
                        </tr>
                        <tr>
                            <th>Rooms</th>
                            <td>{property.bedrooms}</td>
                        </tr>
                        <tr>
                            <th>Condition</th>
                            <td>{property.condition}</td>
                        </tr>
                        <tr>
                            <th>Available from</th>
                            <td>{property.availableFrom}</td>
                        </tr>
                        <tr>
                            <th>Kitchen</th>
                            <td>{property.kitchenType}</td>
                        </tr>
                        <tr>
                            <th>Kitchen equipemnt</th>
                            <td>{property.kitchenEquipment}</td>
                        </tr>
                        <tr>
                            <th>Balcony</th>
                            <td>{property.balcony}</td>
                        </tr>
                        <tr>
                            <th>Balcony details</th>
                            <td>{property.balconyDetails}</td>
                        </tr>
                        <tr>
                            <th>Bathroom details</th>
                            <td>{property.bathroomDetails}</td>
                        </tr>
                        <tr>
                            <th>Storage details</th>
                            <td>{property.storageDetails}</td>
                        </tr>
                        <tr>
                            <th>Miscellaneous</th>
                            <td>{property.miscDetails}</td>
                        </tr>
                        <tr>
                            <th>Sauna</th>
                            <td>{property.sauna}</td>
                        </tr>
                        <tr>
                            <th>Sauna details</th>
                            <td>{property.saunaDetails}</td>
                        </tr>
                        <tr>
                            <th>Other conditions</th>
                            <td>{property.otherConditions}</td>
                        </tr>
                    </table>
                    <h2>Costs</h2>
                    <table>
                        <tr>
                            <th>Rent</th>
                            <td>{property.rent} € / month</td>
                        </tr>
                        <tr>
                            <th>Deposit</th>
                            <td>{property.safetyDeposit} €</td>
                        </tr>
                        <tr>
                            <th>Information about the deposit</th>
                            <td>The safety deposit matches two months rent</td>
                        </tr>
                        <tr>
                            <th>Special conditions for lease</th>
                            <td>Lease is valid until further notice. Earliest termination possible after 11 months.</td>
                        </tr>
                        <tr>
                            <th>Lease term</th>
                            <td>Until further notice. Earliest termination after 11 months.</td>
                        </tr>
                    </table>
                    <h2>Other fees</h2>
                    <table>
                        <tr>
                            <th>Water</th>
                            <td>25 € / month / person</td>
                        </tr>
                        <tr>
                            <th>Electricity</th>
                            <td>Tenant is responsible</td>
                        </tr>
                        <tr>
                            <th>Information about the deposit</th>
                            <td>The safety deposit matches one months rent</td>
                        </tr>
                        <tr>
                            <th>Special conditions for lease</th>
                            <td>Lease is valid until further notice. Earliest termination possible after 11 months.</td>
                        </tr>
                        <tr>
                            <th>Lease term</th>
                            <td>Until further notice. Earliest termination after 11 months.</td>
                        </tr>
                    </table>
                    <h2>Building information</h2>
                    <table>
                        <tr>
                            <th>Building type</th>
                            <td>{property.buildingType}</td>
                        </tr>
                        <tr>
                            <th>Year built</th>
                            <td>{property.yearBuilt} €</td>
                        </tr>
                        <tr>
                            <th>Floors</th>
                            <td>3</td>
                        </tr>
                        <tr>
                            <th>Building ownership</th>
                            <td>Housing cooperative</td>
                        </tr>
                        <tr>
                            <th>Heating</th>
                            <td>Water central heating</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SingleProperty;