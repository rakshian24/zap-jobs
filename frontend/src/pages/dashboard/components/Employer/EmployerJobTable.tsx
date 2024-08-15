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
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { screenSize } from "../../../../constants";
import dayjs from "dayjs";

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
}

type EmployerJobTableProps = {
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

const EmployerJobTable = ({ jobData }: EmployerJobTableProps) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return (
    <TableContainer component={Paper}>
      <Table className={isMobile ? classes.mobileTable : ""}>
        <TableHead>
          <TableRow>
            <TableHeader title="Job Title" icon={<WorkOutlineIcon />} />
            {!isMobile && <TableHeader title="Tags" icon={<TagIcon />} />}
            {!isMobile && (
              <TableHeader title=" Posted On" icon={<DateRangeIcon />} />
            )}
            <TableHeader title="Applications" icon={<AssignmentIndIcon />} />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((job: IJobData) => (
            <TableRow key={job._id}>
              <TableCell>{job.title}</TableCell>
              {!isMobile && <TableCell>{job.tags.join(", ")}</TableCell>}
              {!isMobile && (
                <TableCell>
                  {dayjs(job.createdAt).format("DD-MMM-YYYY, hh:mm A")}
                </TableCell>
              )}
              <TableCell>{job.applicants.length}</TableCell>
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
  );
};

export default EmployerJobTable;
