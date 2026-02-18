import {
  Modal,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3
};

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number | null;
};

export default function ViewApplicantsModal({
  open,
  onClose,
  jobId
}: Props) {

  const {
    data: applicants = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["applications", jobId],
    enabled: !!jobId,
    queryFn: async () => {
      const res = await api.get(`/applications?jobId=${jobId}`);
      return res.data;
    }
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Applicants
        </Typography>

        {isLoading && <CircularProgress />}

        {isError && (
          <Typography color="error">
            Failed to load applicants
          </Typography>
        )}

        {!isLoading && applicants.length === 0 && (
          <Typography color="text.secondary">
            No applicants yet
          </Typography>
        )}

        {!isLoading && applicants.length > 0 && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Applied Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applicants.map((a:any)=>(
                <TableRow key={a.id}>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>
                    {new Date(a.appliedDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Modal>
  );
}
