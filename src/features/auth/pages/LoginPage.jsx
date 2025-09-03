// src/pages/Login.jsx
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Box,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/authActions"; 
import { useNavigate } from "react-router-dom"; 
import bgImage from "../../../assets/Shape.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      setEmail("");
      setPassword("");
      setFormErrors({});
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#4880FF] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-[80%] max-w-md p-6">
        <Paper
          elevation={6}
          className="rounded-2xl w-full"
          sx={{ borderRadius: "16px", padding: "3.5rem 2.5rem" }}
        >
          <Typography
            variant="h6"
            align="center"
            className="text-gray-800"
            style={{ fontWeight: 700, marginBottom: "8px" }}
          >
            Login to Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className="text-gray-500 mt-1 font-semibold"
            style={{ color: "#202224" }}
          >
            Please enter your email and password to continue
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <Typography variant="body2" className="text-gray-700">
              Email Address
            </Typography>
            <TextField
              type="email"
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            {/* Password */}
            <div className="flex justify-between items-center mb-1">
              <Typography variant="body2" className="text-gray-700">
                Password
              </Typography>
              <Link
                href="/forgot-password"
                underline="hover"
                style={{ color: "#202224", fontSize: "14px" }}
              >
                Forgot Password?
              </Link>
            </div>
            <TextField
              type="password"
              placeholder="••••••••"
              fullWidth
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />

            {/* Remember me */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  color="primary"
                />
              }
              label="Remember Password"
              className="text-gray-600"
            />

            {/* Show error from Redux */}
            {error && (
              <Typography
                variant="body2"
                align="center"
                className="text-red-500"
              >
                {error}
              </Typography>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                borderRadius: "8px",
                paddingY: "10px",
                textTransform: "capitalize",
                fontWeight: 600,
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>

          {/* Signup */}
          <Typography
            variant="body2"
            align="center"
            className="text-gray-600"
            style={{ marginTop: "10px" }}
          >
            Don’t have an account?{" "}
            <Link href="/register" underline="hover" className="text-blue-600">
              Create Account
            </Link>
          </Typography>
        </Paper>
      </div>
    </div>
  );
}
