import { faker } from "@faker-js/faker";
import { randomJobRequirements, randomLanguages } from "./helpers";

export const DEV_URL = "http://localhost:3000/";
export const NEXT_STEP_BUTTON = "SubmitBtn";

export enum Role {
  Freelancer = "Freelancer",
  Employer = "Employer",
}

export interface TestData {
  username: string;
  email: string;
  password: string;
  companyName: string;
  role: Role;
  skills: string[];
  githubProfile: string;
  jobTitle: string;
  randomJobRequirements: string[];
  contactInfo: string;
  salaryPerHr: number;
}

export const generateTestData = () => {
  const username = faker.person.firstName();
  return {
    username,
    email: `${username
      .replace(/\s+/g, "")
      .substring(0, 3)
      .toLowerCase()}_emp@g.com`,
    password: "Test-123",
    companyName: faker.company.name(),
    role: Role.Employer,
    githubProfile: username,
    jobTitle: faker.name.jobTitle(),
    skills: randomLanguages,
    randomJobRequirements,
    contactInfo: faker.person.firstName(),
    salaryPerHr: faker.number.int({ min: 0, max: 500 }),
  };
};
