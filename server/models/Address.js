const { Schema } = require('mongoose');

const addressSchema = new Schema(
    {
        address1: {
            type: String,
            required: true,
            trim: true,
        },
        address2: {
            type: String,
            required: false,
            trim: true,
        },
        address3: {
            type: String,
            required: false,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        countyProvince: {
            type: String,
            required: false,
            trim: true,
        },
        state: {
            type: String,
            required: false,
            trim: true,
        },
        zipPostcode: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// const Address = model('Address', addressSchema);

module.exports = addressSchema;