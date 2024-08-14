import { NavLink, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { ROUTES, colors } from "../../constants";
import { Avatar, Stack } from "@mui/material";
import { getInitials, isStandAloneAndRunningOnIos16 } from "../../utils";
import { User } from "../../context/authContext";

const { DASHBOARD, PROFILE } = ROUTES;

const Footer = ({ userInfo }: { userInfo: User | null }) => {
  const { pathname } = useLocation();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        pb: isStandAloneAndRunningOnIos16() ? "35px" : "10px",
        px: "20px",
        pt: "10px",
        borderTop: `1px solid ${colors.lightGrey}`,
      }}
    >
      <NavLink to={DASHBOARD}>
        <RiDashboardFill
          size={30}
          color={pathname === DASHBOARD ? colors.primaryBlue : "#D7D8D9"}
        />
      </NavLink>
      <NavLink to={PROFILE}>
        <Avatar
          sx={{
            width: "32px",
            height: "32px",
            fontSize: "16px",
            fontWeight: 500,
            backgroundColor:
              pathname === PROFILE ? colors.primaryBlue : "#D7D8D9",
          }}
        >
          {getInitials(userInfo?.username)}
        </Avatar>
      </NavLink>
    </Stack>
  );
};

export default Footer;
