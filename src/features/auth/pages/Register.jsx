import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/authActions";
import bgImage from "../../../assets/Shape.png";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Dispatch registration
    dispatch(registerUser(formData));

    // Navigate to login after registration
    // Use setTimeout to wait for the mock async action
    setTimeout(() => {
      navigate("/login");
    }, 1100); // slightly more than your 1000ms delay in action
  };

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
            Create an Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className="text-gray-500 mt-1 font-semibold"
            style={{ color: "#202224" }}
          >
            Create an account to continue
          </Typography>

          <Box component="form" noValidate className="mt-6 space-y-4">
            <Typography variant="body2" className="text-gray-700">
              Email Address
            </Typography>
            <TextField
              name="email"
              fullWidth
              size="small"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <Typography variant="body2" className="text-gray-700">
              User Name
            </Typography>
            <TextField
              name="username"
              fullWidth
              size="small"
              value={formData.username}
              onChange={handleChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />

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
              name="password"
              type="password"
              fullWidth
              size="small"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />

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
              onClick={handleSubmit} // move onSubmit here
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            {error && <Typography color="error">{error}</Typography>}
          </Box>

          <Typography
            variant="body2"
            align="center"
            className="text-gray-600"
            style={{ marginTop: "20px" }}
          >
            Already have an account?{" "}
            <Link href="/login" underline="hover" className="text-blue-600">
              Login
            </Link>
          </Typography>
        </Paper>
      </div>
    </div>
  );
}
