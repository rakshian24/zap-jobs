import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ILoginFormValueTypes, InitialLoginFormValues } from "./helpers";
import { emailRegex, textInputRegex } from "../../utils";
import CustomInput from "../CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, screenSize } from "../../constants";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../context/authContext";
import { LOGIN_MUTATION } from "../../graphql/mutations";

const Login = () => {
  const { user, storeTokenInLS } = useAuth();
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...InitialLoginFormValues },
    mode: "onChange",
  });
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };

  useEffect(() => {
    if (user?.userId) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate, user?.userId]);

  const [registerUser, { loading }] = useMutation(LOGIN_MUTATION);

  const onSubmitHandler = async (formValues: ILoginFormValueTypes) => {
    const { data } = await registerUser({
      variables: {
        loginInput: { ...formValues },
      },
    });
    if (data?.loginUser?.token) {
      storeTokenInLS(data?.loginUser?.token);
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <Stack gap={2}>
      <Typography fontSize={24} fontWeight={600}>
        Login
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

            <Stack
              display={"flex"}
              direction={isMobile ? "column" : "row"}
              justifyContent={"space-between"}
              alignItems={isMobile ? "flex-start" : "center"}
              mt={1}
            >
              <Typography>
                Don't have an account?
                <Link
                  to={ROUTES.REGISTER}
                  style={{
                    marginLeft: "4px",
                    fontWeight: 500,
                  }}
                >
                  Register here
                </Link>
              </Typography>
              <Button
                onClick={() => onSubmitHandler}
                variant="contained"
                type="submit"
                sx={{ width: "120px", mt: isMobile ? "12px" : 0 }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Login;
