import { gql } from '@apollo/client';

export const QUERY_PROPERTIES = gql`
    query {
        properties {
            _id
            propertyTitle
            rent
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
