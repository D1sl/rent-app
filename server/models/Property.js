const { Schema, model } = require('mongoose');
const addressSchema = require('./Address');

const propertySchema = new Schema(
    {
        propertyTitle: {
            type: String,
            required: 'The property requires a title.',
            maxlength: 250
        },
        belongsTo: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rent: {
            type: String,
            required: true
        },
        safetyDeposit: {
            type: String,
            required: true
        },
        buildingType: {
            type: String,
            required: true
        },
        apartmentType: {
            type: String,
            required: true
        },
        floor: {
            type: String,
            required: false
        },
        yearBuilt: {
            type: String,
            // required: true
        },
        livingArea: {
            type: String,
            // required: true
        },
        elevator: {
            type: Boolean,
            // required: true
        },
        bedrooms: {
            type: String
        },
        bathrooms: {
            type: String
        },
        condition: {
            type: String,
        },
        kitchenType: {
            type: String
        },
        kitchenEquipment: {
            type: String
        },
        balcony: {
            type: Boolean
        },
        balconyDetails: {
            type: String,
        },
        bathroomDetails: {
            type: String,
        },
        storageDetails: {
            type: String,
        },
        sauna: {
            type: String,
        },
        contractType: {
            type: String
        },
        miscDetails: {
            type: String
        },
        otherConditions: {
            type: String
        },
        availableFrom: {
            type: String
        },
        televisionDetails: {
            type: String
        },
        address: addressSchema
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Property = model('Property', propertySchema);

module.exports = Property;