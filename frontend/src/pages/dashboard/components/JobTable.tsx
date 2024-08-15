import React, { useState } from "react";
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
import { screenSize } from "../../../constants";

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

interface JobData {
  jobTitle: string;
  tags: string;
  postedOn: string;
  applications: number;
}

const dummyData: JobData[] = [
  {
    jobTitle: "Frontend Developer",
    tags: "React, JavaScript",
    postedOn: "2024-08-01",
    applications: 23,
  },
  {
    jobTitle: "Backend Developer",
    tags: "Node.js, Express",
    postedOn: "2024-08-02",
    applications: 15,
  },
  {
    jobTitle: "UI/UX Designer",
    tags: "Figma, Adobe XD",
    postedOn: "2024-08-03",
    applications: 10,
  },
  {
    jobTitle: "DevOps Engineer",
    tags: "AWS, Docker",
    postedOn: "2024-08-04",
    applications: 8,
  },
  {
    jobTitle: "Data Scientist",
    tags: "Python, ML",
    postedOn: "2024-08-05",
    applications: 12,
  },
  {
    jobTitle: "QA Tester",
    tags: "Selenium, Cypress",
    postedOn: "2024-08-06",
    applications: 18,
  },
  {
    jobTitle: "Project Manager",
    tags: "Agile, Scrum",
    postedOn: "2024-08-07",
    applications: 5,
  },
  {
    jobTitle: "Content Writer",
    tags: "SEO, WordPress",
    postedOn: "2024-08-08",
    applications: 30,
  },
  {
    jobTitle: "Graphic Designer",
    tags: "Photoshop, Illustrator",
    postedOn: "2024-08-09",
    applications: 9,
  },
  {
    jobTitle: "Marketing Specialist",
    tags: "Google Ads, Analytics",
    postedOn: "2024-08-10",
    applications: 14,
  },
];

const JobTable: React.FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showTags] = useState(isMobile ? false : true);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = dummyData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table className={isMobile ? classes.mobileTable : ""}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                {!isMobile && (
                  <WorkOutlineIcon className={classes.headerIcon} />
                )}
                Job Title
              </Stack>
            </TableCell>
            {showTags && (
              <TableCell>
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  {!isMobile && <TagIcon className={classes.headerIcon} />}
                  Tags
                </Stack>
              </TableCell>
            )}
            <TableCell>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                {!isMobile && <DateRangeIcon className={classes.headerIcon} />}
                Posted On
              </Stack>
            </TableCell>
            <TableCell>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                {!isMobile && (
                  <AssignmentIndIcon className={classes.headerIcon} />
                )}
                Applications
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.jobTitle}</TableCell>
              {showTags && <TableCell>{job.tags}</TableCell>}
              <TableCell>{job.postedOn}</TableCell>
              <TableCell>{job.applications}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={dummyData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default JobTable;
