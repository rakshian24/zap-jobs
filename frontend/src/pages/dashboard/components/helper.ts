export enum Roles {
  Freelancer = "Freelancer",
  Employer = "Employer",
}

export interface ICreateJobFormValueTypes {
  title: string;
  description: string;
  companyName: string;
  contactInfo: string;
  salaryPerHour: number;
}

export const InitCreateJobFormValues: ICreateJobFormValueTypes = {
  title: "",
  description: "",
  companyName: "",
  contactInfo: "",
  salaryPerHour: 0,
};
