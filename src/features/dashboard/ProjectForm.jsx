import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";

const defaultFormValues = {
  customerName: "",
  refNumber: "",
  projectName: "",
  projectNumber: "",
  projectLocation: "",
  address: "",
  dueDate: "",
  contact: "",
  status: "",
};

export default function ProjectForm({ initialValues, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState(defaultFormValues);

  useEffect(() => {
    if (initialValues) setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2} fontWeight={700}>
        {initialValues ? "Edit Project" : "Add New Project"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {Object.keys(defaultFormValues).map((field) => (
            <Grid item xs={12} sm={4} key={field} sx={{ display: "flex" }}>
              <Box display="flex" flexDirection="column" flexGrow={1} gap={1}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  name={field}
                  type={field === "dueDate" ? "date" : "text"}
                  InputLabelProps={field === "dueDate" ? { shrink: true } : {}}
                  value={formValues[field] || ""}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box mt={3} display="flex" gap={2}>
          <Button
            variant="contained"
            type="submit"
            sx={{ textTransform: "capitalize" }}
          >
            {initialValues ? "Update" : "Add Now"}
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ textTransform: "capitalize" }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
