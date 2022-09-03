import PropertyForm from '../components/PropertyForm'

import { useState } from 'react';

const NewProperty = () => {
    return (
        <div className="container">
            <div className="mobile-container">
                <h1>New Property</h1>
                <PropertyForm />
            </div>
        </div>
    )
};

export default NewProperty;