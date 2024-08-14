import { Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ROUTES } from "../constants";
import client from "../apolloClient";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const onLogOut = () => {
    client.clearStore();
    logoutUser();
    navigate(ROUTES.LOGIN);
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        px: 2,
        py: 2,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
        position: "sticky",
      }}
    >
      <Link to={"/"}>
        <Typography fontSize={24} fontWeight={600}>
          Zap jobs
        </Typography>
      </Link>
      {user?.userId && (
        <Button variant="outlined" onClick={onLogOut}>
          Logout
        </Button>
      )}
    </Stack>
  );
};

export default Header;
