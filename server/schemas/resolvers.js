const { User, Address, Property } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('properties')
                    .populate('address');
                return userData
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async (parent, { _id }) => {
            const params = _id ? { _id } : {}
            return User.find(params)
                .select('-__v -password')
                .populate('properties')
                .populate('address');
        },
        user: async (parent, { email }) => {
            return User.findOne({ email })
                .select('-__v -password')
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
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;