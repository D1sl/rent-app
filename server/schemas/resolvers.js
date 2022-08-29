const { User, Address, Property } = require('../models');

const resolvers = {
    Query: {
        addresses: async () => {
            return Address.find();
        },
        users: async () => {
            return User.find();
        },
        properties: async () => {
            return Property.find();
        }
    }
};

module.exports = resolvers;