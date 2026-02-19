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
  Alert
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
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

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors }
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
      const res = await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "candidate"
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      nav("/jobs");
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
    </Container>
  );
}
