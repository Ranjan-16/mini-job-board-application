import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import ViewApplicantsModal from "./ApplicantModal";

export default function JobList() {

    const { data: jobs = [], isLoading, isError } = useJobs();
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<number | null>(null);

    const { data: apps = [] } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await api.get("/applications");
            return res.data;
        }
    });



    if (isLoading) return <Typography>Loading jobs...</Typography>;
    if (isError) return <Typography color="error">Error loading jobs</Typography>;


    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Days</TableCell>
                        <TableCell>No. of Applicants</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {jobs.map((job: any) => {

                        const count = apps.filter((a: any) => a.jobId === job.id).length;

                        return (
                            <TableRow key={job.id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.daysRemaining}</TableCell>
                                <TableCell>{count}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => {
                                            setSelectedJob(job.id);
                                            setOpen(true);
                                        }}
                                    >
                                        View Applicants
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <ViewApplicantsModal
                open={open}
                onClose={() => setOpen(false)}
                jobId={selectedJob}
            />
        </>
    );
}
