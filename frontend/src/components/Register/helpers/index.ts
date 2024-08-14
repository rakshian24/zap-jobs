export enum Roles {
  Freelancer = "Freelancer",
  Employer = "Employer",
}

export interface IRegisterFormValueTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  githubProfile: string;
  role: Roles | null;
}

export const InitialRegisterFormValues: IRegisterFormValueTypes = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  githubProfile: "",
  role: null,
};
