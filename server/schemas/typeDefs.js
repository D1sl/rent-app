const { gql } = require('apollo-server-express');
const typeDefs = gql`

    type Address {
        _id: ID
        addressLine1: String
        addressLine2: String
        addressLevel1: String
        addressLevel2: String
        addressLevel3: String
        postalCode: String
        country: String
    }

    type Building {
        _id: ID
        buildingType: String
        buildingTypeSpec: String
        yearBuilt: String
        floors: String
        apartments: String
        heatingMethod: String
        constructionMaterial: String
        plotOwnership: String
        wallStructure: String
        elevator: String
        sauna: String
        address: Address
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
        publishStatus: String
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        username: String
        phone: String
        address: Address
        bio: String
        memberSince: String
        userType: String
        userStatus: String
        properties: [Property]        
    }

    type Query {
        me: User
        users(_id: ID): [User]
        user(username: String!): User
        properties(belongsTo: String): [Property]
        property(_id: ID!): Property
        buildings(address: String): [Building]
        building(address: AddressInput): Building 
    }

    type Auth {
        token: ID!
        user: User
    }

    input AddressInput {
        addressLine1: String
        addressLine2: String
        addressLevel1: String
        addressLevel2: String
        addressLevel3: String
        postalCode: String
        country: String
    }

    type Mutation {
        updateUser(_id: ID!, username: String, email: String, password: String, firstName: String, lastName: String, phone: String): User
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBuilding(buildingType: String!, yearBuilt: String!, address: AddressInput!): Building
        addProperty(propertyTitle: String, publishStatus: String, address: AddressInput): Property
    }
`;

module.exports = typeDefs;