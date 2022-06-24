import { gql } from '@apollo/client'

const ADD_USER = gql`
    mutation AddUser ( 
        $lamount: String!,
        $lpurpose: String!,
        $fname: String!,
        $mname: String!,
        $lname: String!,
        $dob: String!,
        $email: String!,
        $hphone: String!,
        $mphone: String!,
        $ssn: String!,
        $sa1: String!,
        $sa2: String!,
        $city: String!,
        $statess: String!,
        $zip: String!,
        $rd: String!,
        $rt: String!,
        $status: String,
        ) {
            addUser(
                lamount: $lamount,
                lpurpose: $lpurpose,
                fname: $fname,
                mname: $mname,
                lname: $lname,
                dob: $dob,
                email: $email,
                hphone: $hphone,
                mphone: $mphone,
                ssn: $ssn,
                sa1: $sa1,
                sa2: $sa2,
                city: $city,
                statess: $statess,
                zip: $zip,
                rd: $rd,
                rt: $rt,
                status: $status
            ) {
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

const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!,
        # $lamount: Float!,
        # $lpurpose: String!,
        # $fname: String!,
        # $mname: String!,
        # $lname: String!,
        # $dob: String!,
        # $email: String!,
        # $hphone: String!,
        # $mphone: String!,
        # $ssn: String!,
        # $sa1: String!,
        # $sa2: String!,
        # $city: String!,
        # $statess: String!,
        # $zip: Int!,
        # $rd: String!,
        # $rt: String!,
        $status: String!,
    )  {
        updateUser(
            id: $id,
            status: $status,
        ) {
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


export { ADD_USER, UPDATE_USER }