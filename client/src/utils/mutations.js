import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_PROPERTY = gql`
    mutation addProperty($propertyTitle: String!, $address: AddressInput!) {
        addProperty(propertyTitle: $propertyTitle, address: $address) {
          _id
          propertyTitle
          address {
            address1
            country
            zipPostcode
            city
      }
    }
  }
`;