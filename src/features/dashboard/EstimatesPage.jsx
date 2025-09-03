import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import EstimateForm from "./EstimateForm";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { addEstimate, updateEstimate } from "../../store/estimateSlice"; 

export default function EstimatesPage() {
  const { estimates } = useSelector((state) => state.estimates);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [view, setView] = useState("list");
  const [formMode, setFormMode] = useState("add");
  const [selectedRow, setSelectedRow] = useState(null);

  const rowsPerPage = 10;

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedProjects = estimates.slice(start, end);
  const totalPages = Math.ceil(estimates.length / rowsPerPage);

  // Edit handler
  const handleEdit = (row) => {
    setSelectedRow(row);
    setFormMode("edit");
    setView("form");
  };

  // Save handler for form
  const handleSave = (estimateData) => {
    if (formMode === "add") {
      const newEstimate = {
        id: Date.now(),
        version: `V${estimates.length + 1}`,
        project: estimateData.sections[0]?.title || `Project ${estimates.length + 1}`, // <-- fix here
        client: "New Client", // optionally get from form
        createdDate: estimateData.createdDate,
        lastModified: estimateData.lastModified,
        status: "Create",
        sections: estimateData.sections,
        subTotal: estimateData.subTotal,
        totalMargin: estimateData.totalMargin,
        totalAmount: estimateData.totalAmount,
      };
      dispatch(addEstimate(newEstimate));
    } else if (formMode === "edit" && selectedRow) {
      const updatedEstimate = {
        ...selectedRow,
        lastModified: estimateData.lastModified,
        sections: estimateData.sections,
        subTotal: estimateData.subTotal,
        totalMargin: estimateData.totalMargin,
        totalAmount: estimateData.totalAmount,
        project: estimateData.sections[0]?.title || selectedRow.project, // <-- update project name
      };
      dispatch(updateEstimate(updatedEstimate));
    }

    setView("list");
    setSelectedRow(null);
  };

  // Cancel handler for form
  const handleCancel = () => {
    setView("list");
    setSelectedRow(null);
  };

  // Status styling
  const statusStyles = {
    "Create": { text: "#00B69B", bg: "#BFF6F0" },
    "Processing": { text: "#6226EF", bg: "#E4D9FF" },
    "Rejected": { text: "#EF3826", bg: "#FAD7D2" },
    "On Hold": { text: "#FFA756", bg: "#FFE5CC" },
    "In Transit": { text: "#BA29FF", bg: "#E8D1FF" },
  };

  // Render form view
  if (view === "form") {
    return (
      <EstimateForm
        initialData={formMode === "edit" ? selectedRow : null}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    );
  }

  // Render list view
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Estimate
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            setFormMode("add");
            setSelectedRow(null);
            setView("form");
          }}
        >
          Add Estimate
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>VERSION</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>PROJECT</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>CLIENT</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>CREATED DATE</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>LAST MODIFIED</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>STATUS</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProjects.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.version}</TableCell>
                <TableCell align="center">{row.project}</TableCell>
                <TableCell align="center">{row.client}</TableCell>
                <TableCell align="center">{row.createdDate}</TableCell>
                <TableCell align="center">{row.lastModified}</TableCell>
                <TableCell align="center">
                  {row.status ? (
                    <Chip
                      label={row.status}
                      sx={{
                        fontWeight: 600,
                        borderRadius: 2,
                        color: statusStyles[row.status]?.text || "#000",
                        backgroundColor: statusStyles[row.status]?.bg || "#F0F0F0",
                        width: "100%"
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {paginatedProjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No estimates found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Showing {estimates.length === 0 ? 0 : start + 1}–
          {Math.min(end, estimates.length)} of {estimates.length}
        </Typography>

        <Box display="flex" gap={1}>
          <IconButton disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            <ArrowBack />
          </IconButton>
          <IconButton
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}