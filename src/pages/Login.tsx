import {
  Stack,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Alert
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/store";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name?: string;
  email: string;
  password: string;
};

export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>();

  // Login
  const onLogin = async (data: FormValues) => {
    try {
      const res = await api.get(
        `/users?email=${data.email}&password=${data.password}`
      );

      const user = res.data[0];

      if (!user) {
        setErrorMsg("Invalid credentials");
        return;
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUser(user));

      if (user.role === "admin") nav("/admin");
      else nav("/jobs");
    } catch (err) {
      setErrorMsg("Something went wrong");
    }
  };

  const onRegister = async (data: FormValues) => {
    try {
      await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "candidate"
      });

      setErrorMsg("");
      alert("Candidate Registered");
      setIsRegister(false);
      reset();
    } catch {
      setErrorMsg("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            color: "white"
          }}
        >
          {isRegister ? <AppRegistrationIcon /> : <LoginIcon />}
        </Box>

        <Typography variant="h4" fontWeight={700}>
          {isRegister ? "Create Account" : "Welcome Back"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {isRegister
            ? "Register as a candidate to apply for jobs"
            : "Sign in to your account to continue"}
        </Typography>
      </Box>

      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          {/* ✅ FIXED Stack */}
          <Stack spacing={2.5} mt={2}>
            {/* Name Field */}
            {isRegister && (
              <TextField
                fullWidth
                label="Full Name"
                {...register("name", {
                  required: "Name is required"
                })}
                error={!!errors.name}
                helperText={errors.name?.message as string}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "action.active" }} />
                    </InputAdornment>
                  )
                }}
              />
            )}

            {/* Email */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "action.active" }} />
                  </InputAdornment>
                )
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "Password required"
              })}
              error={!!errors.password}
              helperText={errors.password?.message as string}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "action.active" }} />
                  </InputAdornment>
                )
              }}
            />

            {/* Submit */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit(isRegister ? onRegister : onLogin)}
              startIcon={isRegister ? <AppRegistrationIcon /> : <LoginIcon />}
              sx={{ py: 1.5, fontWeight: 600, textTransform: "none" }}
            >
              {isRegister ? "Create Account" : "Sign In"}
            </Button>
          </Stack>

          <Divider sx={{ my: 2.5 }}>OR</Divider>

          <Button
            fullWidth
            variant="text"
            onClick={() => setIsRegister(!isRegister)}
            sx={{ textTransform: "none" }}
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "Don't have an account? Register"}
          </Button>
        </CardContent>
      </Card>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textAlign: "center", display: "block", mt: 3 }}
      >
        💼 Mini Job Board © 2026
      </Typography>
    </Container>
  );
}
