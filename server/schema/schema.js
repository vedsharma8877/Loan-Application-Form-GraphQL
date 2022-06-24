const User = require('../model/UserModel')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
} = require('graphql')

// User type

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        lamount: { type: GraphQLFloat},
        lpurpose: { type: GraphQLString},
        fname: { type: GraphQLString},
        mname: { type: GraphQLString},
        lname: { type: GraphQLString},
        dob: { type: GraphQLString},
        email: { type: GraphQLString},
        hphone: { type: GraphQLString},
        mphone: { type: GraphQLString},
        ssn: { type: GraphQLString},
        sa1: { type: GraphQLString},
        sa2: { type: GraphQLString},
        city: { type: GraphQLString},
        statess: { type: GraphQLString},
        zip: { type: GraphQLInt},
        rd: { type: GraphQLString},
        rt: { type: GraphQLString},
        status: { type: GraphQLString},
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find();
            },
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args) {
                return User.findById(args.id)
            },
        },
    }
})

// Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a user
        addUser: {
            type: UserType,
            args: {
                lamount: { type: GraphQLNonNull(GraphQLString) },
                lpurpose: { type: GraphQLNonNull(GraphQLString) },
                fname: { type: GraphQLNonNull(GraphQLString) },
                mname: { type: GraphQLString },
                lname: { type: GraphQLNonNull(GraphQLString) },
                dob: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                hphone: { type: GraphQLNonNull(GraphQLString) },
                mphone: { type: GraphQLNonNull(GraphQLString) },
                ssn: { type: GraphQLNonNull(GraphQLString) },
                sa1: { type: GraphQLNonNull(GraphQLString) },
                sa2: { type: GraphQLString },
                city: { type: GraphQLNonNull(GraphQLString) },
                statess: { type: GraphQLNonNull(GraphQLString) },
                zip: { type: GraphQLNonNull(GraphQLString) },
                rd: { type: GraphQLNonNull(GraphQLString) },
                rt: { type: GraphQLNonNull(GraphQLString) },
                status: { type: GraphQLString,
                    defaultValue: 'Pending'
                },
            },
            resolve(parent, args) {
                const user = new User({
                    lamount: args.lamount,
                    lpurpose: args.lpurpose,
                    fname: args.fname,
                    mname: args.mname,
                    lname: args.lname,
                    dob: args.dob,
                    email: args.email,
                    hphone: args.hphone,
                    mphone: args.mphone,
                    ssn: args.ssn,
                    sa1: args.sa1,
                    sa2: args.sa2,
                    city: args.city,
                    statess: args.statess,
                    zip: args.zip,
                    rd: args.rd,
                    rt: args.rt,
                    status: args.status,
                })

                return user.save()
            },
        },

        // Update user's status

        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                status: { type: GraphQLNonNull(GraphQLString) },
            },

            resolve(parent ,args ) {
                return User.findByIdAndUpdate(args.id, {
                    $set: {
                        status: args.status,
                    },
                },
                    { new : true}
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})