import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../../utils/mutations';
import { AddressAutofill } from '@mapbox/search-js-react';

import { motion, AnimatePresence } from 'framer-motion';

import elevatorIcon from '../../assets/img/elevator-icon.png';
import balconyIcon from '../../assets/img/balcony-icon.png';
import saunaIcon from '../../assets/img/sauna-icon.png';

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
    const [subStep, setSubStep] = useState(1);

    let statusPercentage = "0%"

    if (step === 1) {
        statusPercentage = "5%"
    } else if (step === 2) {
        statusPercentage = "35%"
    } else if (step === 3) {
        statusPercentage = "65%"
    } else if (step === 4) {
        statusPercentage = "100%"
    }

    function validateForm() {
        if (step === 1 & !formState.propertyTitle) {
            console.log("fired")
            return true
        } else if (step === 2 & !addressState.addressLine1) {
            return true
        }
    }

    const animPrefs = {
        initial: {
            y: 100,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        transition: {
            duration: 0.5,
            ease: "backInOut"
        },
        exit: {
            y: -100,
            opacity: 0
        }
    }

    const motionVariants = {
        show: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    }

    const motionItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <>
            <div className='form-fullscreen'>
                <div className='form-left'>
                    <div className='form-title'>
                        <AnimatePresence exitBeforeEnter>
                            {step === 1 ? (
                                <motion.h1
                                    key={step}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >Give your property a nice title</motion.h1>
                            ) : null}
                            {step === 2 ? (
                                <motion.h1
                                    key={step}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >Where is it located?</motion.h1>
                            ) : null}
                            {step === 3 ? (
                                <motion.h1
                                    key={step}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >What kinds of amenities are included in the rental?</motion.h1>
                            ) : null}
                            {step === 4 ? (
                                <motion.h1
                                    key={step}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >Now tell us about the kitchen</motion.h1>
                            ) : null}
                        </AnimatePresence>
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
                            <AnimatePresence exitBeforeEnter>

                                {step === 1 ? (
                                    <motion.div
                                        key={step}
                                        initial={animPrefs.initial}
                                        animate={animPrefs.animate}
                                        transition={animPrefs.transition}
                                        exit={animPrefs.exit}
                                    >
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
                                    </motion.div>
                                ) : null}

                                {step === 2 ? (
                                    <motion.div
                                        key={step}
                                        initial={animPrefs.initial}
                                        animate={animPrefs.animate}
                                        transition={animPrefs.transition}
                                        exit={animPrefs.exit}
                                    >
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
                                    </motion.div>
                                ) : null}

                                {step === 3 ? (
                                    <motion.div
                                        key={step}
                                        initial={animPrefs.initial}
                                        animate={animPrefs.animate}
                                        transition={animPrefs.transition}
                                        exit={animPrefs.exit}
                                    >
                                        <h2>Amenities</h2>
                                        <motion.div
                                            variants={motionVariants}
                                            initial="hidden"
                                            animate="show"
                                            className='amenities'
                                        >

                                            <motion.label
                                                key="balcony"
                                                variants={motionItem}
                                                initial={{ opacity: 0, y: 100 }}
                                                className='amenity-item'
                                            >
                                                <input type="checkbox" className='amenity-checkbox' />
                                                <div className='amenity-item-content'>
                                                    <div className='amenity-tickmark'></div>
                                                    <div className='amenity-icon'>
                                                        <img src={elevatorIcon} className="amenity-icon-image" alt="elevator" />
                                                    </div>
                                                    <div className='amenity-name'>Balcony</div>
                                                </div>
                                                <div className='amenity-item-details'>
                                                    <input
                                                        className='form-input form-input-standalone'
                                                        placeholder="Balcony details"
                                                        type="text"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </motion.label>

                                            <motion.label
                                                key="dishwasher"
                                                variants={motionItem}
                                                initial={{ opacity: 0, y: 100 }}
                                                className='amenity-item'
                                            >
                                                <input type="checkbox" className='amenity-checkbox' />
                                                <div className='amenity-item-content-nodetails'>
                                                    <div className='amenity-tickmark'></div>
                                                    <div className='amenity-icon'>
                                                        <img src={elevatorIcon} className="amenity-icon-image" alt="elevator" />
                                                    </div>
                                                    <div className='amenity-name'>Air Conditioning</div>
                                                </div>
                                            </motion.label>

                                            <motion.label
                                                key="dishwasher"
                                                variants={motionItem}
                                                initial={{ opacity: 0, y: 100 }}
                                                className='amenity-item'
                                            >
                                                <input type="checkbox" className='amenity-checkbox' />
                                                <div className='amenity-item-content'>
                                                    <div className='amenity-tickmark'></div>
                                                    <div className='amenity-icon'>
                                                        <img src={elevatorIcon} className="amenity-icon-image" alt="elevator" />
                                                    </div>
                                                    <div className='amenity-name'>Storage</div>
                                                </div>
                                                <div className='amenity-item-details'>
                                                    <input
                                                        className='form-input form-input-standalone'
                                                        placeholder="Storage details"
                                                        type="text"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </motion.label>

                                            <motion.label
                                                key="dishwasher"
                                                variants={motionItem}
                                                initial={{ opacity: 0, y: 100 }}
                                                className='amenity-item'
                                            >
                                                <input type="checkbox" className='amenity-checkbox' />
                                                <div className='amenity-item-content-nodetails'>
                                                    <div className='amenity-tickmark'></div>
                                                    <div className='amenity-icon'>
                                                        <img src={elevatorIcon} className="amenity-icon-image" alt="elevator" />
                                                    </div>
                                                    <div className='amenity-name'>Internet included</div>
                                                </div>
                                            </motion.label>

                                        </motion.div>
                                    </motion.div>
                                ) : null}

                                {step === 4 ? (
                                    <motion.div
                                        key={step}
                                        initial={animPrefs.initial}
                                        animate={animPrefs.animate}
                                        transition={animPrefs.transition}
                                        exit={animPrefs.exit}
                                    >
                                        <motion.div
                                            key={setSubStep}
                                            initial={animPrefs.initial}
                                            animate={animPrefs.animate}
                                            transition={animPrefs.transition}
                                            exit={animPrefs.exit}
                                        >
                                            <AnimatePresence exitBeforeEnter>

                                                {subStep === 1 ? (

                                                    <>
                                                        <h2>Kitchen type</h2>
                                                        <motion.div
                                                            variants={motionVariants}
                                                            initial="hidden"
                                                            animate="show"
                                                            className='amenities'
                                                        >
                                                            <motion.label
                                                                key="kitchentype"
                                                                variants={motionItem}
                                                                initial={{ opacity: 0, y: 100 }}
                                                                className='amenity-item'
                                                            >
                                                                <input type="radio" name="kitchen_type" className='amenity-checkbox' />
                                                                <div className='amenity-item-content-nodetails'>
                                                                    <div className='amenity-tickmark'></div>
                                                                    <div className='amenity-name'>Living room kitchen</div>
                                                                </div>
                                                            </motion.label>
                                                            <motion.label
                                                                key="kitchentype"
                                                                variants={motionItem}
                                                                initial={{ opacity: 0, y: 100 }}
                                                                className='amenity-item'
                                                            >
                                                                <input type="radio" name="kitchen_type" className='amenity-checkbox' />
                                                                <div className='amenity-item-content-nodetails'>
                                                                    <div className='amenity-tickmark'></div>
                                                                    <div className='amenity-name'>Open kitchen</div>
                                                                </div>
                                                            </motion.label>

                                                            <motion.label
                                                                key="kitchentype"
                                                                variants={motionItem}
                                                                initial={{ opacity: 0, y: 100 }}
                                                                className='amenity-item'
                                                            >
                                                                <input type="radio" name="kitchen_type" className='amenity-checkbox'
                                                                    onChange={() => setSubStep(subStep + 1)}
                                                                />
                                                                <div className='amenity-item-content-nodetails'>
                                                                    <div className='amenity-tickmark'></div>
                                                                    <div className='amenity-name'>Kitchen closet</div>
                                                                </div>
                                                            </motion.label>

                                                        </motion.div>
                                                    </>

                                                ) : null}

                                                {subStep === 2 ? (
                                                    <>
                                                        <button className='button btn-action' onClick={() => setSubStep(subStep - 1)}>Back</button>
                                                        <h2>Kitchen details</h2>
                                                    </>
                                                ) : null}
                                            </AnimatePresence>


                                        </motion.div>


                                    </motion.div>
                                ) : null}

                                {step === 5 ? (
                                    <motion.div
                                        key={step}
                                        initial={animPrefs.initial}
                                        animate={animPrefs.animate}
                                        transition={animPrefs.transition}
                                        exit={animPrefs.exit}
                                    >
                                        <h1>{formState.propertyTitle}</h1>
                                        <p>
                                            {addressState.addressLine1} {addressState.addressLine2}, {addressState.postalCode} {addressState.addressLevel2}
                                        </p>
                                        <button className='button btn-action'>
                                            Publish
                                        </button>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
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
                                {step === 4 ? null : (
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