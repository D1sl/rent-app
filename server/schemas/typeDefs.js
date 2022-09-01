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
        belongsTo: User
        address: Address
        rent: String
        safetyDeposit: String
        buildingType: String
        apartmentType: String
        floor: String
        yearBuilt: String
        livingArea: String
        elevator: String
        bedrooms: String
        bathrooms: String
        condition: String
        kitchenType: String
        kitchenEquipment: String
        balcony: String
        balconyDetails: String
        bathroomDetails: String
        storageDetails: String
        sauna: String
        contractType: String
        miscDetails: String
        otherConditions: String
        availableFrom: String
        televisionDetails: String
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        username: String
        phone: String
        address: Address
        userType: String
        properties: [Property]        
    }

    type Query {
        me: User
        users(_id: ID): [User]
        user(_id: ID!): User
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