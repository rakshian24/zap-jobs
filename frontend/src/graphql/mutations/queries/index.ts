import gql from "graphql-tag";

export const GET_MY_JOBS = gql`
  query {
    myJobs {
      _id
      title
      description
      requirements
      tags
      companyName
      contactInfo
      salaryPerHour
      createdAt
      applicants {
        _id
        username
      }
    }
  }
`;
