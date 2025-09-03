import { useState } from "react";
import { TextField, Button, Typography, Link, Box, Paper } from "@mui/material";
import bgImage from "../../../assets/Shape.png";
import { useNavigate } from "react-router-dom";

const USERS_KEY = "mock_users";
const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMsg("");
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";

    if (!formData.password.trim()) tempErrors.password = "Password is required";

    if (!formData.confirmPassword.trim()) tempErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    setTimeout(() => {
      const users = getUsers();
      const index = users.findIndex((u) => u.email === formData.email);

      if (index !== -1) {
        users[index].password = formData.password;
        saveUsers(users);
        setSuccessMsg("Password updated successfully! Redirecting to login...");
        setFormData({ email: "", password: "", confirmPassword: "" });

        setTimeout(() => navigate("/login"), 1200);
      } else {
        setErrors({ email: "Email does not exist" });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#4880FF] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-[80%] max-w-md p-6">
        <Paper elevation={6} className="rounded-2xl w-full" sx={{ borderRadius: "16px", padding: "3.5rem 2.5rem" }}>
          <Typography variant="h6" align="center" style={{ fontWeight: 700, marginBottom: "8px" }}>
            Forgot / Reset Password
          </Typography>
          <Typography variant="body2" align="center" className="text-gray-500 mt-1 font-semibold">
            Enter your email and new password
          </Typography>

          <Box component="form" noValidate className="mt-6 space-y-4">
            <Typography variant="body2" className="text-gray-700">Email Address</Typography>
            <TextField
              name="email"
              fullWidth
              size="small"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <Typography variant="body2" className="text-gray-700">New Password</Typography>
            <TextField
              type="password"
              name="password"
              fullWidth
              size="small"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Typography variant="body2" className="text-gray-700">Confirm Password</Typography>
            <TextField
              type="password"
              name="confirmPassword"
              fullWidth
              size="small"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ borderRadius: "8px", paddingY: "10px", textTransform: "capitalize", fontWeight: 600 }}
              onClick={handleSubmit}
            >
              {loading ? "Processing..." : "Update Password"}
            </Button>

            {successMsg && (
              <Typography color="success.main" className="mt-2">
                {successMsg}
              </Typography>
            )}

            <Typography variant="body2" align="center" className="text-gray-600 mt-4">
              Go back to <Link href="/login" className="text-blue-600">Login</Link>
            </Typography>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
