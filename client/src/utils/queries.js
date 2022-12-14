import { gql } from '@apollo/client';

export const QUERY_PROPERTIES = gql`
    query {
        properties {
            _id
            propertyTitle
            rent
            buildingType
            apartmentType
            publishStatus
            address {
                addressLine1
                addressLine2
                addressLevel1
                addressLevel2
                addressLevel3
                postalCode
                country
            }
        }
    }
`;

export const QUERY_PROPERTY = gql`
    query property($id: ID!) {
        property(_id: $id) {
            _id
            propertyTitle
            rent
            safetyDeposit
            buildingType
            apartmentType
            floor
            yearBuilt
            livingArea
            elevator
            bedrooms
            bathrooms
            condition
            kitchenType
            kitchenEquipment
            balcony
            balconyDetails
            bathroomDetails
            storageDetails
            sauna
            contractType
            miscDetails
            otherConditions
            televisionDetails
            availableFrom
            publishStatus
            address {
                addressLine1
                addressLine2
                addressLevel1
                addressLevel2
                addressLevel3
                postalCode
                country
            }
            belongsTo {
                _id
                firstName
                lastName
                username
                phone
                email
              }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            email
            firstName
            lastName
            phone
            email
            username
            bio
            memberSince
            address {
                city
            }
            properties {
                _id
                rent
                address {
                    addressLine1
                    addressLine2
                    addressLevel1
                    addressLevel2
                    addressLevel3
                    postalCode
                    country
                }
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            firstName
            lastName
            bio
            email
            phone
            userStatus
            memberSince
            address {
                addressLine1
                addressLine2
                addressLevel1
                addressLevel2
                addressLevel3
                postalCode
                country
            }
            properties {
                _id
                propertyTitle
                rent
                address {
                    addressLine1
                    addressLine2
                    addressLevel1
                    addressLevel2
                    addressLevel3
                    postalCode
                    country
                }
            }
        }
    }
`;

export const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email
            userStatus
            properties {
                _id
                rent
                address {
                    addressLine1
                    addressLine2
                    addressLevel1
                    addressLevel2
                    addressLevel3
                    postalCode
                    country
                }
            }
        }
    }
`;