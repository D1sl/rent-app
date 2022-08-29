const { Schema, model } = require('mongoose');

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
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Property = model('Property', propertySchema);

module.exports = Property;