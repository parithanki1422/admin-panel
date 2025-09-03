import React from "react";
import { Chip } from "@mui/material";

const CustomChip = () => {
  return (
    <Chip
      label="Sample Section"
      variant="outlined"
      sx={{
        borderRadius: 1, // makes corners squared (1px instead of rounded)
        bgcolor: "grey.100", // light background
        borderColor: "grey.300", // light border
        fontWeight: "500",
        px: 1.5, // horizontal padding
        py: 0.5, // vertical padding
      }}
    />
  );
};

export default CustomChip;
