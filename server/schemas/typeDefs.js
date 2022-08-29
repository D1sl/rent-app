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
        address: Address
        userType: String
        properties: [Property]        
    }

    type Query {
        me: User
        users(_id: ID): [User]
        user(email: String!): User
        properties(belongsTo: String): [Property]
        property(_id: ID!): Property
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        addProperty(propertyTitle: String!): Property
    }
`;

module.exports = typeDefs;