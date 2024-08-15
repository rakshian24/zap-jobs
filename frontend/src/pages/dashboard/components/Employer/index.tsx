import { Stack, Typography, useMediaQuery } from "@mui/material";
import { screenSize } from "../../../../constants";
import JobTable from "./EmployerJobTable";
import { useQuery } from "@apollo/client";
import { GET_MY_JOBS } from "../../../../graphql/queries";
import Button from "../../../../components/CustomButton";
import { useState } from "react";
import CreateJobDialog from "../CreateJobDialog";
import CommonSkeleton from "../../../../components/CommonSkeleton";

const Employer = () => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const [showCreateJobModal, setShowCreateJobModal] = useState<boolean>(false);

  const { data, loading: isJobsDataLoading, refetch } = useQuery(GET_MY_JOBS);

  const handleJobCreated = () => {
    refetch();
  };

  return (
    <Stack gap={isTablet ? 3 : 4}>
      <Typography fontSize={16}>
        Welcome to your dashboard. Here, you can manage your job postings, view
        applications from talented freelancers, and keep track of it with ease.
        Let's get started!
      </Typography>

      <Stack>
        <Typography variant={isTablet ? "h6" : "h5"}>
          Create a New Job Posting
        </Typography>
        <Stack
          gap={2}
          direction={isTablet ? "column" : "row"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Typography>
            Need to hire more talent? Post a new job now and start receiving
            applications from top freelancers.
          </Typography>
          <Button
            buttonText="Create Job"
            onClick={() => setShowCreateJobModal(true)}
            styles={{ alignSelf: "flex-end" }}
            dataTestId="employerCreateJobBtn"
          />
        </Stack>
      </Stack>
      <CreateJobDialog
        open={showCreateJobModal}
        handleClose={() => setShowCreateJobModal(false)}
        onJobCreated={handleJobCreated}
      />

      <Stack gap={isTablet ? 3 : 4}>
        <Typography variant={isTablet ? "h6" : "h5"}>
          Your Job Postings
        </Typography>
        {isJobsDataLoading ? (
          <CommonSkeleton
            height={350}
            sx={{ borderRadius: isTablet ? 3 : 6 }}
          />
        ) : (
          <JobTable jobData={data?.myJobs || []} />
        )}
      </Stack>
    </Stack>
  );
};

export default Employer;
