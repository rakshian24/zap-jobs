import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime
  scalar IntOrString

  enum Role {
    Freelancer
    Employer
  }

  type User {
    _id: ID!
    username: String
    email: String
    role: Role!
    skills: [String]
    githubProfile: String
    jobsPosted: [Job]
    jobsApplied: [Job]
  }

  type AuthResponse {
    user: User
    token: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    role: Role!
    skills: [String]
    githubProfile: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Job {
    _id: ID!
    title: String!
    description: String!
    requirements: [String]!
    tags: [String]!
    companyName: String!
    contactInfo: String!
    salaryPerHour: Int!
    postedBy: User!
    applicants: [User]
    createdAt: DateTime
    isAppliedByCurrentUser: Boolean!
  }

  input JobInput {
    title: String!
    description: String!
    requirements: [String]!
    tags: [String]!
    companyName: String!
    contactInfo: String!
    salaryPerHour: Int!
  }

  type Query {
    me: User
    myJobs: [Job]
    getAllJobs(skill: [String], minSalary: Int): [Job]
    user(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): AuthResponse
    loginUser(loginInput: LoginInput): AuthResponse
    createJob(jobInput: JobInput): Job
    applyForJob(jobId: ID!): Job
  }
`;
