import gql from "graphql-tag";

export const REGISTER_USER_MUTATION = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      token
      user {
        _id
        username
        email
        role
        skills
        githubProfile
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Mutation($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
      user {
        _id
        email
        username
        role
        skills
        githubProfile
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation Mutation($jobInput: JobInput) {
    createJob(jobInput: $jobInput) {
      _id
      title
      description
      requirements
      tags
      companyName
      contactInfo
      salaryPerHour
    }
  }
`;

export const APPLY_FOR_JOB = gql`
  mutation Mutation($jobId: ID!) {
    applyForJob(jobId: $jobId) {
      _id
      title
      description
      requirements
      tags
      companyName
      contactInfo
      salaryPerHour
      isAppliedByCurrentUser
    }
  }
`;
