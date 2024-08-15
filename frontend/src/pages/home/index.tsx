import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ReactComponent as Flagman } from "../../assets/svgs/flagman.svg";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import { colors } from "../../constants";

const Home = () => {
  return (
    <Stack direction={"row"} height={"100%"}>
      <Stack width={"50%"} px={6} py={3} bgcolor={colors.primary}>
        <Box>
          <Logo width="200px" />
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          <Flagman width="100%" height={"500px"} />
        </Box>
      </Stack>
      <Stack
        width={"50%"}
        height={"100%"}
        pl={10}
        pr={20}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box py={7.5}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Home;
