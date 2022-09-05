const { Schema, model } = require('mongoose');
const addressSchema = require('./Address');

const buildingSchema = new Schema(
    {
        buildingType: {
            type: String,
            required: false,
            trim: true,
        },
        buildingTypeSpec: {
            type: String,
            required: false,
            trim: true,
        },
        yearBuilt: {
            type: String,
            required: false,
            trim: true,
        },
        floors: {
            type: String,
            required: false,
            trim: true,
        },
        apartments: {
            type: String,
            required: false,
            trim: true,
        },
        heatingMethod: {
            type: String,
            required: false,
            trim: true,
        },
        constructionMaterial: {
            type: String,
            required: false,
            trim: true,
        },
        plotOwnership: {
            type: String,
            required: false,
            trim: true
        },
        wallStructure: {
            type: String,
            required: false,
            trim: true
        },
        elevator: {
            type: Boolean,
            required: false
        },
        sauna: {
            type: Boolean,
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

const Building = model('Building', buildingSchema)

module.exports = Building;