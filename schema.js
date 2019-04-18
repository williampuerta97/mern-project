export default `
  type User{
    _id: ID!
    username: String!
    password: String!
  }

  type Mutation{
    createUser(username: String!, password: String!): User!
  }

  type Query{
      allUsers : [User]!
      getUser(_id:ID): User!
  }  
`;