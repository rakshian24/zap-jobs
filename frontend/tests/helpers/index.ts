import { faker } from "@faker-js/faker";

const programmingLanguages: string[] = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "Go",
  "PHP",
  "Swift",
  "TypeScript",
  "Kotlin",
  "R",
  "Perl",
  "Scala",
  "Rust",
  "Objective-C",
  "Elixir",
  "Haskell",
  "Dart",
  "Lua",
];

const jobRequirements: string[] = [
  "6 years experienced",
  "full stack",
  "devops",
  "frontend developer",
  "backend developer",
];

function getRandomLanguages(count: number): string[] {
  return Array.from({ length: count }, () =>
    faker.helpers.arrayElement(programmingLanguages)
  );
}

export const randomLanguages: string[] = getRandomLanguages(9);

function getRandomJobRequirements(count: number): string[] {
  return Array.from({ length: count }, () =>
    faker.helpers.arrayElement(jobRequirements)
  );
}

export const randomJobRequirements: string[] = getRandomJobRequirements(4);
