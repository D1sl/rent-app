const { User, Address, Property } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .populate('properties')
                .populate('address');
        },
        user: async (parent, { email }) => {
            return User.findOne({ email })
        },
        properties: async (parent, { belongsTo }) => {
            const params = belongsTo ? { belongsTo } : {};
            return Property.find(params)
                .populate('address');
        },
        addresses: async () => {
            return Address.find();
        },
        property: async (parent, { _id }) => {
            return Property.findOne({ _id })
                .populate('address')
        }
    }
};

module.exports = resolvers;