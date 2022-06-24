import { gql } from '@apollo/client'

const GET_USERS = gql `
    query getUsers {
        users {
            id
            lamount
            lpurpose
            fname
            mname
            lname
            dob
            email
            hphone
            mphone
            ssn
            sa1
            sa2
            city
            statess
            zip
            rd
            rt
            status
        }
    }
`

const GET_USER = gql`
    query getUser ($id: ID!) {
        user(id: $id) {
            id
            lamount
            lpurpose
            fname
            mname
            lname
            dob
            email
            hphone
            mphone
            ssn
            sa1
            sa2
            city
            state
            zip
            rd
            rt
        }
    }
`

export { GET_USERS, GET_USER }