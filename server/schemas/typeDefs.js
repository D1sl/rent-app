const { gql } = require('apollo-server-express');
const typeDefs = gql`

    type Address {
        _id: ID
        address1: String
        address2: String
        address3: String
        city: String
        countyProvince: String
        state: String
        zipPostcode: String
        country: String
    }

    type Property {
        _id: ID
        propertyTitle: String
        belongsTo: String
        address: Address
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phone: String
        userType: String
        address: [Address]
        properties: [Property]        
    }

    type Query {
        users: [User]
        user(email: String!): User
        addresses: [Address]
        properties(belongsTo: String): [Property]
        property(_id: ID!): Property
    }
`;

module.exports = typeDefs;