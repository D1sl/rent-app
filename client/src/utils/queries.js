import { gql } from '@apollo/client';

export const QUERY_PROPERTIES = gql`
    query {
        properties {
            _id
            propertyTitle
            rent
            buildingType
            apartmentType
            address {
                address1
                address2
                address3
                zipPostcode
                city
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
            address {
                address1
                address2
                address3
                zipPostcode
                city
                country
            }
        }
    }
`;
