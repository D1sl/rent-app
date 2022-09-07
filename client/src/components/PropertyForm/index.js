import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../../utils/mutations';
import { AddressAutofill } from '@mapbox/search-js-react';

import whiteLogo from '../../assets/img/logo-white.png';

import './style.css';

import { QUERY_ME_BASIC } from '../../utils/queries';
import { Link } from 'react-router-dom';

const PropertyForm = () => {

    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const [addProperty, { error }] = useMutation(ADD_PROPERTY);

    const [formState, setFormState] = useState({
        propertyTitle: "",
        rent: "",
    });

    const [addressState, setAddressState] = useState({
        addressLine1: "",
        addressLine2: "",
        addressLevel2: "",
        postalCode: "",
        country: "",
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
        validateForm();
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
                publishStatus: "draft",
                belongsTo: userData._id,
                address
            }
        }).then(
            window.location.assign('/'))
    }

    // Form Pagination
    const [step, setStep] = useState(1);

    let statusPercentage = "0%"

    if (step === 1) {
        statusPercentage = "5%"
    } else if (step === 2) {
        statusPercentage = "35%"
    } else if (step === 3) {
        statusPercentage = "65%"
    }

    let buttonDisabled;

    function validateForm() {
        if (step === 1 & !formState.propertyTitle) {
            console.log("fired")
            return true
        } else if (step === 2 & !addressState.addressLine1) {
            return true
        }
    }

    return (
        <>
            <div className='form-fullscreen'>
                <div className='form-left'>
                    <div className='form-title'>
                        {step === 1 ? (
                            <h1>Give your property a nice title</h1>
                        ) : null}
                        {step === 2 ? (
                            <h1>Where is it located?</h1>
                        ) : null}
                        {step === 3 ? (
                            <h1>We are ready to publish this listing!</h1>
                        ) : null}
                    </div>
                </div>
                <div className='form-right'>
                    <div className='form-top'>
                        <Link to="/profile">
                            <button className='button'>Cancel</button>
                        </Link>
                    </div>
                    <div className='form-content'>
                        <form onSubmit={handleSubmit}>
                            {step === 1 ? (
                                <>
                                    <h2>Create a Title</h2>
                                    <p>In a few words, describe your property and what makes it special.</p>
                                    <textarea
                                        rows="3"
                                        className='form-input form-input-standalone input-large'
                                        name='propertyTitle'
                                        type='text'
                                        required
                                        placeholder='A well lit flat at the heart of San Francisco'
                                        onChange={handleChange}
                                        value={formState.propertyTitle}
                                    />
                                </>
                            ) : null}

                            {step === 2 ? (
                                <>
                                    <h2>Enter an Address</h2>
                                    <AddressAutofill
                                        accessToken="pk.eyJ1IjoiYmVubW9saW5pIiwiYSI6ImNsN242N2t5MTA1ZmYzbnAzdjc4MTMwbW8ifQ.MXHyvIiPxoupFTIGgvFVhw">
                                        <input
                                            className='form-input form-input-standalone'
                                            name="addressLine1"
                                            placeholder="Address"
                                            type="text"
                                            autoComplete="address-line1"
                                            onChange={handleAddressChange}
                                            value={addressState.addressLine1}
                                        />
                                    </AddressAutofill>
                                    <div className='inputs'>
                                        <input
                                            className='form-input input-group'
                                            name="addressLine2"
                                            placeholder="Apartment"
                                            type="text"
                                            autoComplete="address-line2"
                                            onChange={handleAddressChange}
                                            value={addressState.addressLine2}
                                        />
                                        <input
                                            className='form-input input-group'
                                            name="addressLevel2"
                                            placeholder="City"
                                            type="text"
                                            autoComplete="address-level2"
                                            onChange={handleAddressChange}
                                            value={addressState.addressLevel2}
                                        />
                                        <input
                                            className='form-input input-group'
                                            name="postalCode"
                                            placeholder="Postal Code or Zip"
                                            type="text"
                                            autoComplete="postal-code"
                                            onChange={handleAddressChange}
                                            value={addressState.postalCode}
                                        />
                                        <input
                                            className='form-input input-group'
                                            name="country"
                                            placeholder="Country"
                                            type="text"
                                            autoComplete="country"
                                            onChange={handleAddressChange}
                                            value={addressState.country}
                                        />
                                    </div>
                                </>
                            ) : null}

                            {step === 3 ? (
                                <>
                                    <h1>{formState.propertyTitle}</h1>
                                    <p>
                                        {addressState.addressLine1} {addressState.addressLine2}, {addressState.postalCode} {addressState.addressLevel2}
                                    </p>
                                    <button className='button btn-action'>
                                        Publish
                                    </button>
                                </>
                            ) : null}

                        </form>
                    </div>
                    <div className='form-controls'>
                        <div
                            className='statusbar'
                            style={{ width: statusPercentage }}
                        ></div>
                        <div className='form-buttons'>
                            <div>
                                {step === 1 ? null : (
                                    <button
                                        className='button btn-action'
                                        onClick={() => setStep(step - 1)}
                                        disabled={step < 2}
                                    >Back</button>
                                )}
                            </div>
                            <div>
                                {step === 3 ? null : (
                                    <button
                                        className='button btn-action'
                                        onClick={() => {
                                            setStep(step + 1)
                                        }}
                                        disabled={validateForm()}
                                    >Next</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PropertyForm;