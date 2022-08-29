const { User, Address, Property } = require('../models');

const resolvers = {
    Query: {
        users: async (parent, { _id }) => {
            const params = _id ? { _id } : {}
            return User.find(params)
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
        property: async (parent, { _id }) => {
            return Property.findOne({ _id })
            .populate('address')
        },
        addresses: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Address.find(params);
        },
    }
};

module.exports = resolvers;