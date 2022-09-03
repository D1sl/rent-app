import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../../utils/mutations';

import { QUERY_ME_BASIC } from '../../utils/queries';

const PropertyForm = () => {

    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const [addProperty, { error }] = useMutation(ADD_PROPERTY);

    const [formState, setFormState] = useState({
        propertyTitle: "",
    });

    const [addressState, setAddressState] = useState({
        address1: "",
        zipPostcode: "",
        city: "",
        country: ""
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
        const { propertyTitle } = formState;
        const address = addressState;

        addProperty({
            variables: {
                propertyTitle,
                belongsTo: userData._id,
                address
            }
        })

    }

    return (
        <>
            <form className='form-stacked' onSubmit={handleSubmit}>
                {/* <form className='form-stacked'> */}
                <input
                    className='form-input'
                    name='propertyTitle'
                    type='text'
                    required
                    placeholder='Title'
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    name='address1'
                    type='text'
                    required
                    placeholder='Street address'
                    onChange={handleAddressChange}
                />
                <input
                    className='form-input'
                    name='zipPostcode'
                    type='text'
                    required
                    placeholder='Post code'
                    onChange={handleAddressChange}
                />
                <input
                    className='form-input'
                    name='city'
                    type='text'
                    required
                    placeholder='City'
                    onChange={handleAddressChange}
                />
                <input
                    className='form-input'
                    name='country'
                    type='text'
                    required
                    placeholder='Country'
                    onChange={handleAddressChange}
                />
                <button className='button btn-action'>
                    Submit
                </button>
            </form>
            {error && <p>Something went wrong.</p>}
        </>
    )
};

export default PropertyForm;