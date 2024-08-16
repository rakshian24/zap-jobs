/* eslint-disable testing-library/prefer-screen-queries */
import { test } from "@playwright/test";
import { generateTestData, NEXT_STEP_BUTTON, Role } from "../testingData";
import { sharedSignupTestSetup } from "../sharedSignup";

sharedSignupTestSetup({ role: Role.Employer });

let testData;

test.describe("Employer: Create Job", () => {
  test("Create Job", async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);

    console.log(`Creating Job ${testInfo.title}`);

    for (let i = 0; i < 200; i++) {
      testData = generateTestData();
      console.log(`testData_${i}`, testData);

      await page.getByTestId("employerCreateJobBtn").click();
      await page.getByTestId("jobTitle").fill(testData.jobTitle);
      await page.getByTestId("jobDescription").fill("Some Random Text");
      await page
        .getByTestId("jobRequirements")
        .type(testData.randomJobRequirements.join(","), { delay: 50 });

      await page.getByTestId("jobRequirements").type(",", { delay: 50 });

      await page
        .getByTestId("tags")
        .type(testData.skills.join(","), { delay: 50 });

      await page.getByTestId("tags").type(",", { delay: 50 });

      await page.getByTestId("companyName").fill(testData.companyName);
      await page.getByTestId("contactInfo").fill(testData.contactInfo);
      await page
        .getByTestId("salaryPerHr")
        .fill(testData.salaryPerHr.toString());
      await page.getByTestId(NEXT_STEP_BUTTON).click();
    }
  });
});
