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
    mutation addProperty($propertyTitle: String, $address: AddressInput, $publishStatus: String) {
        addProperty(propertyTitle: $propertyTitle, address: $address, publishStatus: $publishStatus) {
          _id
          propertyTitle
          rent
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

export const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $firstName: String, $lastName: String, $phone: String) {
        updateUser(_id: $id, firstName: $firstName, lastName: $lastName, phone: $phone) {
        _id
            firstName
            lastName
            phone
      }
    }
`;