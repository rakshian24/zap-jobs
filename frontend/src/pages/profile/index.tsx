import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  ListItemIcon,
} from "@mui/material";
import { Circle } from "@mui/icons-material"; // Importing the Circle icon
import { screenSize } from "../../constants";
import { GET_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import Skeleton from "./Skeleton";

const Profile = ({ userId = "" }: { userId: string }) => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  const { data, loading: isUserDataLoading } = useQuery(GET_USER, {
    variables: {
      id: userId,
    },
  });

  if (isUserDataLoading) {
    return <Skeleton />;
  }

  return (
    <Stack gap={isTablet ? 3 : 4}>
      <Stack gap={isTablet ? 3 : 4}>
        <Typography variant={isTablet ? "h6" : "h5"}>About Me</Typography>
        <Typography fontSize={16}>
          {`${
            data.user.username
          } is a skilled developer with experience in ${data.user.skills.join(
            ", "
          )}. Dedicated to delivering high-quality work and continuously
            improving skills to meet the demands of a dynamic industry.`}
        </Typography>
      </Stack>
      <Stack gap={isTablet ? 1 : 2}>
        <Typography variant={isTablet ? "h6" : "h5"}>My skills</Typography>
        <List>
          {data.user.skills.map((skill: string, index: string) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: "20px" }}>
                <Circle sx={{ fontSize: 10 }} />
              </ListItemIcon>
              <ListItemText primary={skill} />
            </ListItem>
          ))}
        </List>
      </Stack>
      <Stack gap={isTablet ? 3 : 4}>
        <Typography variant={isTablet ? "h6" : "h5"}>
          Github projects
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
