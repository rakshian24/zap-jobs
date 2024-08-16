import { Stack, Typography, useMediaQuery } from "@mui/material";
import { screenSize } from "../../../../constants";
import { GET_ALL_JOBS } from "../../../../graphql/queries";
import CommonSkeleton from "../../../../components/CommonSkeleton";
import { useQuery } from "@apollo/client";
import FreelancerJobTable from "./FreelancerJobTable";

const Freelancer = () => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  const { data, loading: isJobsDataLoading } = useQuery(GET_ALL_JOBS);

  return (
    <Stack gap={isTablet ? 3 : 4}>
      <Typography fontSize={16}>
        Great to see you! You can view the jobs posted by the employers below.
      </Typography>

      <Stack gap={isTablet ? 3 : 4}>
        <Typography variant={isTablet ? "h6" : "h5"}>
          Available Job Listings
        </Typography>
        {isJobsDataLoading ? (
          <CommonSkeleton
            height={350}
            sx={{ borderRadius: isTablet ? 3 : 6 }}
          />
        ) : (
          <FreelancerJobTable jobData={data?.getAllJobs || []} />
        )}
      </Stack>
    </Stack>
  );
};

export default Freelancer;
