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

export const GET_ALL_JOBS = gql`
  query getAllJobs($minSalary: Int, $skill: [String]) {
    getAllJobs(minSalary: $minSalary, skill: $skill) {
      _id
      title
      description
      requirements
      tags
      companyName
      contactInfo
      salaryPerHour
      createdAt
      postedBy {
        _id
        username
      }
    }
  }
`;
