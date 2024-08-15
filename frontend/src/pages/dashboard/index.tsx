import { Stack, Typography, useMediaQuery } from "@mui/material";
import { screenSize } from "../../constants";
import { User } from "../../context/authContext";
import { Roles } from "../../components/Register/helpers";
import Freelancer from "./components/Freelancer";
import Employer from "./components/Employer";

const Dashboard = ({ userInfo }: { userInfo: User | null }) => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  return (
    <Stack>
      <Typography variant={isTablet ? "h5" : "h4"} mb={2}>
        Welcome, {userInfo?.username}!
      </Typography>
      {userInfo?.role === Roles.Employer ? <Employer /> : <Freelancer />}
    </Stack>
  );
};

export default Dashboard;
