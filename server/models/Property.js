const { Schema, model } = require('mongoose');
const addressSchema = require('./Address');
const userSchema = require('./User');

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
            required: false
        },
        safetyDeposit: {
            type: String,
            required: false
        },
        buildingType: {
            type: String,
            required: false
        },
        apartmentType: {
            type: String,
            required: false
        },
        floor: {
            type: String,
            required: false
        },
        yearBuilt: {
            type: String,
            required: false
        },
        livingArea: {
            type: String,
            required: false
        },
        elevator: {
            type: Boolean,
            required: false
        },
        bedrooms: {
            type: String,
            required: false
        },
        bathrooms: {
            type: String,
            required: false
        },
        condition: {
            type: String,
            required: false
        },
        kitchenType: {
            type: String,
            required: false
        },
        kitchenEquipment: {
            type: String,
            required: false
        },
        balcony: {
            type: Boolean,
            required: false
        },
        balconyDetails: {
            type: String,
            required: false
        },
        bathroomDetails: {
            type: String,
            required: false
        },
        storageDetails: {
            type: String,
            required: false
        },
        sauna: {
            type: String,
            required: false
        },
        contractType: {
            type: String,
            required: false
        },
        miscDetails: {
            type: String,
            required: false
        },
        otherConditions: {
            type: String,
            required: false
        },
        availableFrom: {
            type: String,
            required: false
        },
        televisionDetails: {
            type: String,
            required: false
        },
        address: addressSchema,
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Property = model('Property', propertySchema);

module.exports = Property;