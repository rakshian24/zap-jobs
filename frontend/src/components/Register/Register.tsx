import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Backdrop,
  Button,
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
import { ROUTES, screenSize } from "../../constants";
import { useAuth } from "../../context/authContext";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../graphql/mutations";
import TagInput from "../TagInput";
import CustomSelect from "../CustomSelect";

const Register = () => {
  const { storeTokenInLS, user } = useAuth();
  const navigate = useNavigate();

  const [tags, setTags] = useState<string[]>([]); // State to store tags

  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION);

  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const { control, formState, handleSubmit, watch } = useForm({
    defaultValues: { ...InitialRegisterFormValues },
    mode: "onChange",
  });

  const selectedRole = watch("role");

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
    <Stack gap={2}>
      <Typography fontSize={24} fontWeight={600}>
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
                  placeholder="Select the role type"
                  defaultValue={field.value}
                  onChange={(e: SelectChangeEvent<unknown>) => {
                    field.onChange(e.target.value);
                  }}
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
                />
              )}
            />
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
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter password"
                  label="Password"
                  type="password"
                />
              )}
            />
            <Controller
              name="confirmPassword"
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
                  placeholder="Enter confirm password"
                  label="Confirm password"
                  type="password"
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
                <TagInput onTagsChange={(newTags) => setTags(newTags)} />
              </>
            )}
            <Stack
              display={"flex"}
              direction={isMobile ? "column" : "row"}
              justifyContent={"space-between"}
              alignItems={isMobile ? "flex-start" : "center"}
              mt={1}
            >
              <Typography>
                Already have an account?
                <Link
                  to={ROUTES.LOGIN}
                  style={{
                    marginLeft: "4px",
                    fontWeight: 500,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
              <Button
                onClick={() => onSubmitHandler}
                variant="contained"
                type="submit"
                sx={{ width: "120px", mt: isMobile ? "12px" : 0 }}
                // disabled={isFormDisabled}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
