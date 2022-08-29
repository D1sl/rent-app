const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const addressSchema = require('./Address');

const propertySchema = new Schema(
    {
        propertyTitle: {
            type: String,
            required: 'The property requires a title.',
            maxlength: 250
        },
        email: {
            type: String,
            required: true
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