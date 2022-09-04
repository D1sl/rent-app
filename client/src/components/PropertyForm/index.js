import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../../utils/mutations';
import { AddressAutofill } from '@mapbox/search-js-react';

import { QUERY_ME_BASIC } from '../../utils/queries';

const PropertyForm = () => {

    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const [addProperty, { error }] = useMutation(ADD_PROPERTY);

    const [formState, setFormState] = useState({
        propertyTitle: "",
        rent: "",
    });

    const [addressState, setAddressState] = useState({
        address1: "",
        zipPostcode: "",
        city: "",
        country: "",
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    function handleAddressChange(event) {
        const { name, value } = event.target;
        setAddressState({
            ...addressState,
            [name]: value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const { propertyTitle, rent } = formState;
        const address = addressState;

        addProperty({
            variables: {
                propertyTitle,
                rent,
                belongsTo: userData._id,
                address
            }
        }).then(
            window.location.assign('/')            )
    }


    return (
        <>
            <div>
                <form className='form-stacked'>

                </form>
            </div>
            <form className='form-stacked' onSubmit={handleSubmit}>
                <input
                    className='form-input form-input-standalone'
                    name='propertyTitle'
                    type='text'
                    required
                    placeholder='Title'
                    onChange={handleChange}
                />
                <h3>Address details</h3>



                <AddressAutofill accessToken="pk.eyJ1IjoiYmVubW9saW5pIiwiYSI6ImNsN242N2t5MTA1ZmYzbnAzdjc4MTMwbW8ifQ.MXHyvIiPxoupFTIGgvFVhw">
                    <input
                        className='form-input form-input-standalone'
                        name="address1" 
                        placeholder="Address" 
                        type="text"
                        autoComplete="address-line1"
                        onChange={handleAddressChange}
                    />
                </AddressAutofill>
                <div className='inputs'>

                    <div className='inputs'>
                        <input
                            className='form-input input-group'
                            name="apartment" 
                            placeholder="Apartment number" 
                            type="text"
                            autoComplete="address-line2"
                        />
                        <input
                            className='form-input input-group'
                            name="city" 
                            placeholder="City" 
                            type="text"
                            autoComplete="address-level2"
                            onChange={handleAddressChange}
                        />
                        <input
                            className='form-input input-group'
                            name="country" 
                            placeholder="Country" 
                            type="text"
                            autoComplete="country"
                            onChange={handleAddressChange}
                        />
                        <input
                            className='form-input input-group'
                            name="zipPostcode" 
                            placeholder="Postcode" 
                            type="text"
                            autoComplete="postal-code"
                            onChange={handleAddressChange}
                        />
                    </div>




                    {/* <input
                        className='form-input input-group'
                        name='address1'
                        type='text'
                        required
                        placeholder='Street address'
                        onChange={handleAddressChange}
                    />
                    <input
                        className='form-input input-group'
                        name='zipPostcode'
                        type='text'
                        required
                        placeholder='Post code'
                        onChange={handleAddressChange}
                    />
                    <input
                        className='form-input input-group'
                        name='city'
                        type='text'
                        required
                        placeholder='City'
                        onChange={handleAddressChange}
                    />
                    <input
                        className='form-input input-group'
                        name='country'
                        type='text'
                        required
                        placeholder='Country'
                        onChange={handleAddressChange}
                    /> */}
                </div>
                {/* <h3>Pricing</h3>
                <div className='inputs'>
                    <input
                        className='form-input form-input-standalone'
                        name='rent'
                        type='number'
                        required
                        placeholder='Rent'
                        onChange={handleAddressChange}
                    />
                </div> */}
                <button className='button btn-action'>
                    Submit
                </button>
            </form>
            {error && <p>Something went wrong.</p>}
        </>
    )
};

export default PropertyForm;