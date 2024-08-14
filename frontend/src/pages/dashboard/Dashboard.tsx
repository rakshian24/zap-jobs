import { Stack, Typography, useMediaQuery } from "@mui/material";
import { screenSize } from "../../constants";
import { User } from "../../context/authContext";

const Dashboard = ({ userInfo }: { userInfo: User | null }) => {
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  return (
    <Stack>
      <Typography fontSize={isMobile ? 16 : 18} fontWeight={500} mb={3}>
        Hi, {userInfo?.username}
      </Typography>
    </Stack>
  );
};

export default Dashboard;
