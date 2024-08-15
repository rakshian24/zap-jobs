import { Stack, Typography, useMediaQuery } from "@mui/material";
import { screenSize } from "../../../constants";
import JobTable from "./JobTable";
import { useQuery } from "@apollo/client";
import { GET_MY_JOBS } from "../../../graphql/mutations/queries";
import Button from "../../../components/CustomButton";
import { useState } from "react";
import CreateJobDialog from "./CreateJobDialog";

const Employer = () => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const [showCreateJobModal, setShowCreateJobForm] = useState<boolean>(false);

  const { data, loading } = useQuery(GET_MY_JOBS);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("datadata = ", data);

  return (
    <Stack gap={isTablet ? 3 : 4}>
      <Typography fontSize={16}>
        Welcome to your dashboard. Here, you can manage your job postings, view
        applications from talented freelancers, and keep track of it with ease.
        Let's get started!
      </Typography>

      <Stack>
        <Typography variant={isTablet ? "h5" : "h4"}>
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
            onClick={() => setShowCreateJobForm(true)}
            styles={{ alignSelf: "flex-end" }}
          />
        </Stack>
      </Stack>
      <CreateJobDialog
        open={showCreateJobModal}
        handleClose={() => setShowCreateJobForm(false)}
      />

      <Stack gap={isTablet ? 3 : 4}>
        <Typography variant={isTablet ? "h5" : "h4"}>
          Your Job Postings
        </Typography>
        <JobTable />
      </Stack>
    </Stack>
  );
};

export default Employer;
