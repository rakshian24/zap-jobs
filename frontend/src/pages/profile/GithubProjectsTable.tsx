import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Typography,
} from "@mui/material";
import CommonSkeleton from "../../components/CommonSkeleton";

interface Repo {
  name: string;
  html_url: string;
}

interface GithubProjectsTableProps {
  githubUsername: string;
}

const GithubProjectsTable: React.FC<GithubProjectsTableProps> = ({
  githubUsername,
}) => {
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        if (!githubUsername) return;

        const response = await axios.get<Repo[]>(
          `https://api.github.com/users/${githubUsername}/repos`
        );
        setRepositories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error loading repositories.");
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [githubUsername]);

  if (loading) return <CommonSkeleton height={350} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repository Name</TableCell>
            <TableCell>Link to Repo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repositories.map((repo, index) => (
            <TableRow key={index}>
              <TableCell>{repo.name}</TableCell>
              <TableCell>
                <Link href={repo.html_url} target="_blank" rel="noopener">
                  View on GitHub
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GithubProjectsTable;
