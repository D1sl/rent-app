const { User, Property, Building } = require('../models');
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
                const userData = await User.findOne({ _id: context.user._id })
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
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('properties')
        },
        properties: async (parent, { belongsTo }) => {
            const params = belongsTo ? { belongsTo } : {};
            return Property.find(params)
            .populate('belongsTo')
        },
        property: async (parent, { _id }) => {
            return Property.findOne({ _id })
            .populate('belongsTo')
        },
        building: async (parent, { _id }) => {
            return Building.findOne({ _id })
        },
        // Finds all buildings in a specific address
        buildings: async(parent, { address }) => {
            const params = address ? {"address.addressLine1": address} : {};
            return Building.find(params)
        }
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
        addBuilding: async (parent, args, context) => {
            if (context.user) {
                const building = await Building.create({ ...args })

                return building;
            }

            throw new AuthenticationError(errorMessage.noAuth);
        },
        updateUser: async (parent, args) => {
            return User.findByIdAndUpdate(args._id, args, { new: true }).exec();
        }

        // Not working for now
        // addAddress: async (parent, { propertyId, addressData }, context) => {
        //     if (context.user) {
        //         const updatedProperty = await Property.updateOne(
        //             { _id: propertyId },
        //             { $set: { address: addressData } },
        //             { new: true, runValidators: true }
        //         );

        //         return updatedProperty;
        //     }

        //     throw new AuthenticationError(errorMessage.noAuth);
        // }
    }
};

module.exports = resolvers;