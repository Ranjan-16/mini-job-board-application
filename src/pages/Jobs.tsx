import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Container,
  Chip,
  Box,
  Grid,
  Divider,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { useJobs } from "../hooks/useJobs";
import { useApply } from "../hooks/useApply";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/store";

export default function Jobs() {

  const {
    data: jobs = [],
    isLoading,
    isError
  } = useJobs();

  const { mutate, isPending } = useApply();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((s:any)=>s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // ✅ Get applications
  const {
    data: applications = []
  } = useQuery({
    queryKey:["applications"],
    queryFn: async ()=>{
      const res = await api.get("/applications");
      return res.data;
    }
  });

  // ✅ Loading State
  if(isLoading){
    return (
      <Container sx={{ py:6, textAlign:"center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // ✅ Error State
  if(isError){
    return (
      <Container sx={{ py:6 }}>
        <Typography color="error">
          Failed to load jobs
        </Typography>
      </Container>
    );
  }

  const jobsActive = jobs.filter((job:any)=>job.daysRemaining > 0);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Available Jobs
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Find and apply to exciting job opportunities
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

      <Stack spacing={3}>
        {jobsActive.map((job:any)=>{

          const alreadyApplied = applications.some(
            (a:any)=> a.jobId === job.id && a.email === user?.email
          );

          const urgencyColor =
            job.daysRemaining <= 3
              ? "error"
              : job.daysRemaining <= 7
              ? "warning"
              : "success";

          const urgencyLabel =
            job.daysRemaining === 1
              ? "Last day!"
              : job.daysRemaining <= 3
              ? "Closing soon"
              : "Active";

          return (
            <Card
              key={job.id}
              
            >
              <Box
                sx={{
                  position:"absolute",
                  top:0,left:0,right:0,
                  height:3,
                  background:"linear-gradient(90deg,#1976d2,#42a5f5)"
                }}
              />

              <CardContent>
                <Grid container spacing={2} alignItems="flex-start">

                  <Grid item xs={12} sm={9}>
                    <Typography variant="h5" fontWeight={600} mb={1}>
                      {job.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                    >
                      {job.description}
                    </Typography>

                    <Box sx={{ display:"flex", gap:1, flexWrap:"wrap" }}>
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={`${job.daysRemaining} day${job.daysRemaining !== 1 ? "s" : ""} left`}
                        color={urgencyColor}
                        variant="outlined"
                        size="small"
                      />

                      <Chip
                        label={urgencyLabel}
                        color={urgencyColor}
                        size="small"
                      />

                      {alreadyApplied && (
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Applied"
                          color="success"
                          size="small"
                        />
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3} sx={{ display:"flex", justifyContent:"flex-end" }}>
                    <Button
                      variant={alreadyApplied ? "outlined" : "contained"}
                      color={alreadyApplied ? "success" : "primary"}
                      size="large"
                      disabled={
                        alreadyApplied ||
                        job.daysRemaining === 0 ||
                        isPending ||
                        !user
                      }
                      onClick={()=>mutate({
                        jobId: job.id,
                        name: user?.name,
                        email: user?.email,
                        appliedDate: new Date()
                      })}
                      sx={{ minWidth:120 }}
                    >
                      {alreadyApplied ? "Applied ✓" : "Apply Now"}
                    </Button>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      {jobsActive.length === 0 && (
        <Box sx={{ textAlign:"center", py:6 }}>
          <Typography variant="h6" color="text.secondary">
            No active jobs available at the moment
          </Typography>
        </Box>
      )}
    </Container>
  );
}
