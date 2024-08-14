import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime
  scalar IntOrString

  enum Role {
    Freelancer
    Employer
  }

  type UserProfile {
    skillSet: [String]
    minSalaryPerHour: Int
    companyName: String
    contactInfo: String
  }

  type User {
    _id: ID
    username: String
    email: String
    role: Role!
    profile: UserProfile!
  }

  type AuthResponse {
    user: User
    token: String
  }

  input UserProfileInput {
    skillSet: [String]
    minSalaryPerHour: Int
    companyName: String
    contactInfo: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    role: Role!
    profile: UserProfileInput!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): AuthResponse
    loginUser(loginInput: LoginInput): AuthResponse
  }
`;
