const { User, Address, Property } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const errorMessage = {
    noAuth: "Not logged in.",
    wrongCreds: "Incorrect credentials."
}

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('properties')
                return userData
            }
            throw new AuthenticationError(errorMessage.noAuth);
        },
        users: async (parent, { _id }) => {
            const params = _id ? { _id } : {}
            return User.find(params)
                .select('-__v -password')
                .populate('properties')
        },
        user: async (parent, { email }) => {
            return User.findOne({ email })
                .select('-__v -password')
        },
        properties: async (parent, { belongsTo }) => {
            const params = belongsTo ? { belongsTo } : {};
            return Property.find(params)
        },
        property: async (parent, { _id }) => {
            return Property.findOne({ _id })
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
                throw new AuthenticationError(errorMessage.wrongCreds);
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError(errorMessage.wrongCreds)
            }

            const token = signToken(user);
            return { token, user };
        },
        addProperty: async (parent, args, context) => {
            if (context.user) {
                const property = await Property.create({ ...args, belongsTo: context.user._id })

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { properties: property._id } },
                    { new: true }
                );

                return property;
            }

            throw new AuthenticationError(errorMessage.noAuth);
        },
        addAddress: async (parent, args, context) => {
            if (context.user) {
                const address = await Address.create(args);

                return address
            }

            throw new AuthenticationError(errorMessage.noAuth);
        }
    }
};

module.exports = resolvers;