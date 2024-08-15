import React, { ReactElement, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  TablePagination,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TagIcon from "@mui/icons-material/LocalOffer";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { screenSize } from "../../../../constants";
import dayjs from "dayjs";
import { DomainOutlined, FavoriteOutlined } from "@mui/icons-material";
import Button from "../../../../components/CustomButton";
import { APPLY_FOR_JOB } from "../../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const useStyles = makeStyles(() => ({
  tableContainer: {
    margin: "auto",
    maxWidth: "100%",
  },
  mobileTable: {
    "& td, & th": {
      padding: 12,
    },
  },
  headerIcon: {
    verticalAlign: "middle",
    marginRight: 0.5,
  },
  searchField: {
    marginBottom: 2,
    width: "100%",
  },
}));

interface IUser {
  _id: string;
  username: string;
  email: string;
}

interface IJobData {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  tags: string[];
  companyName: string;
  contactInfo: string;
  salaryPerHour: number;
  applicants: IUser[];
  createdAt: Date;
  isAppliedByCurrentUser: boolean;
}

type JobTableProps = {
  jobData: IJobData[];
};

type TableHeaderProps = {
  title: string;
  icon: ReactElement;
};

const TableHeader = ({ title, icon }: TableHeaderProps) => {
  return (
    <TableCell>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        {icon}
        {title}
      </Stack>
    </TableCell>
  );
};

const FreelancerJobTable = ({ jobData }: JobTableProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const [applyForJob, { loading: isApplyForJobLoading }] =
    useMutation(APPLY_FOR_JOB);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = jobData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleApplyJob = async (jobId: string) => {
    console.log("JobId = ", jobId);

    setIsLoading(true);

    try {
      await applyForJob({
        variables: {
          jobId,
        },
      });

      setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, jobId]);

      setSnackbarMessage("Applied for job successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error while applying for job: ", error);

      setSnackbarMessage("Something went wrong!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <CustomSnackBar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <TableContainer component={Paper}>
        <Table className={isMobile ? classes.mobileTable : ""}>
          <TableHead>
            <TableRow>
              <TableHeader title="Job Title" icon={<WorkOutlineIcon />} />
              <TableHeader title="Company" icon={<DomainOutlined />} />
              <TableHeader title="Salary/hr" icon={<TagIcon />} />
              <TableHeader title="Posted On" icon={<DateRangeIcon />} />
              <TableHeader title="Apply" icon={<FavoriteOutlined />} />
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((job: IJobData) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.companyName}</TableCell>
                <TableCell>{job.salaryPerHour}</TableCell>
                <TableCell>
                  {dayjs(job.createdAt).format("DD-MMM-YYYY, hh:mm A")}
                </TableCell>
                <TableCell>
                  <Button
                    buttonText={
                      appliedJobs.includes(job._id) ||
                      job.isAppliedByCurrentUser
                        ? "Applied"
                        : "Apply"
                    }
                    onClick={() => handleApplyJob(job._id)}
                    isLoading={isLoading || isApplyForJobLoading}
                    disabled={
                      appliedJobs.includes(job._id) ||
                      job.isAppliedByCurrentUser
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={jobData?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </>
  );
};

export default FreelancerJobTable;
