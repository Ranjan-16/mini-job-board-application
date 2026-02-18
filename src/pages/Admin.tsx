import { Container, Typography, Stack, Box, Paper, Button } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/store";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

export default function Admin(){
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return(
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1
            }}
          >
            <AdminPanelSettingsIcon /> Admin Panel
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage job postings and view applications
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Stack spacing={4}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            background: "linear-gradient(135deg, rgba(25, 118, 210, 0.05), rgba(66, 165, 245, 0.05))"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Post New Job
          </Typography>
          <JobForm/>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            All Job Postings
          </Typography>
          <JobList/>
        </Paper>
      </Stack>
    </Container>
  );
}
