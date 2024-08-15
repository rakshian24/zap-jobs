import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Backdrop,
  CircularProgress,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  InitialRegisterFormValues,
  IRegisterFormValueTypes,
  Roles,
} from "./helpers";
import { emailRegex, textInputRegex } from "../../utils";
import CustomInput from "../CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { colors, ROUTES, screenSize } from "../../constants";
import { useAuth } from "../../context/authContext";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../graphql/mutations";
import TagInput from "../TagInput";
import CustomSelect from "../CustomSelect";
import Button from "../CustomButton";
import { NavigateNext } from "@mui/icons-material";
import ErrorBox from "../ErrorBox";

const Register = () => {
  const { storeTokenInLS, user } = useAuth();
  const navigate = useNavigate();
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  const [tags, setTags] = useState<string[]>([]);

  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION);

  const { control, formState, handleSubmit, watch, trigger } = useForm({
    defaultValues: { ...InitialRegisterFormValues },
    mode: "onChange",
  });

  const selectedRole = watch("role");
  const newPassword = watch("password");
  const newConfirmPassword = watch("confirmPassword");

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };
  const isFormDisabled = !formState.isValid;

  useEffect(() => {
    if (user?.userId) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate, user?.userId]);

  const onSubmitHandler = async (formValues: IRegisterFormValueTypes) => {
    const { data } = await registerUser({
      variables: {
        registerInput: {
          ...formValues,
          skills: tags,
        },
      },
    });
    if (data?.registerUser?.token) {
      storeTokenInLS(data?.registerUser?.token);
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <Stack gap={isTablet ? 3 : 5} width={"100%"} mt={isTablet ? 5 : 0}>
      <Typography fontSize={isTablet ? 24 : 30} fontWeight={600}>
        Create an account
      </Typography>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack>
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack gap={2}>
            <Stack
              direction={isTablet ? "column" : "row"}
              gap={isTablet ? 2 : 3}
            >
              <Controller
                name="role"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomSelect
                    {...field}
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    label={"Role type"}
                    placeholder="Select your role"
                    defaultValue={field.value}
                    onChange={(e: SelectChangeEvent<unknown>) => {
                      field.onChange(e.target.value);
                    }}
                    dataTestId="registrationRole"
                  >
                    {Object.values(Roles).map((role, index) => (
                      <MenuItem key={index} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                )}
              />
              <Controller
                name="username"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                  pattern: {
                    value: textInputRegex,
                    message: "Invalid characters",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    {...field}
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    placeholder="Enter username"
                    label="Username"
                    dataTestId="registrationUsername"
                  />
                )}
              />
            </Stack>
            <Controller
              name="email"
              {...COMMON_PROPS}
              rules={{
                required: true,
                pattern: {
                  value: emailRegex,
                  message: "Invalid characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter email"
                  label="Email"
                  dataTestId="registrationEmail"
                />
              )}
            />
            <Controller
              name="password"
              {...COMMON_PROPS}
              rules={{
                required: true,
                pattern: {
                  value: textInputRegex,
                  message: "Invalid characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  isProtected
                  onKeyUp={() => {
                    if (!!newConfirmPassword) {
                      trigger("confirmPassword");
                    }
                  }}
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter password"
                  label="Password"
                  dataTestId="registrationPassword"
                />
              )}
            />
            <Controller
              name="confirmPassword"
              {...COMMON_PROPS}
              rules={{
                required: true,
                validate: (value) =>
                  value === newPassword || `Passwords do not match.`,
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  isProtected
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter confirm password"
                  label="Confirm password"
                  dataTestId="registrationConfirmPassword"
                />
              )}
            />
            {selectedRole === Roles.Freelancer && (
              <>
                <Controller
                  name="githubProfile"
                  {...COMMON_PROPS}
                  rules={{
                    pattern: {
                      value: textInputRegex,
                      message: "Invalid characters",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomInput
                      {...field}
                      error={error !== undefined}
                      styles={{ width: "100%" }}
                      placeholder="Enter github username"
                      label="Github username"
                      type="text"
                    />
                  )}
                />
                <TagInput
                  onTagsChange={(newTags) => setTags(newTags)}
                  label="Skills"
                  placeholder="Enter your skills"
                />
              </>
            )}
            <ErrorBox formState={formState} style={{ mb: 2 }} />
            <Stack
              display={"flex"}
              direction={isTablet ? "column" : "row"}
              justifyContent={"space-between"}
              alignItems={isTablet ? "flex-start" : "center"}
              mt={1}
              gap={2}
            >
              <Typography>
                Already have an account?
                <Link
                  to={ROUTES.LOGIN}
                  style={{
                    marginLeft: "4px",
                    fontWeight: 500,
                    color: colors.brown,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
              <Button
                buttonText="Register"
                onClick={() => onSubmitHandler}
                disabled={isFormDisabled}
                endIcon={<NavigateNext />}
                styles={{ alignSelf: "flex-end" }}
              />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
