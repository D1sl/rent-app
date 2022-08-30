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
