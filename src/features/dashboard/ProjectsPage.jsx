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
  TextField,
  Typography,
  Paper,
  Modal,
  Chip,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import dayjs from "dayjs";
import ProjectForm from "../dashboard/ProjectForm";
import { addProject, updateProject } from "../../store/projectSlice";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  const [dateFilter, setDateFilter] = useState("");
  const [tempStatus, setTempStatus] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [page, setPage] = useState(0);

  const rowsPerPage = 10;

  // 🔹 View state: table OR form
  const [view, setView] = useState("table"); // "table" | "form"
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setView("form");
  };

  const handleEdit = (project) => {
    setEditData(project);
    setView("form");
  };

  const handleSubmit = (data) => {
    if (editData) {
      dispatch(updateProject(data));
    } else {
      dispatch(addProject({ ...data, id: Date.now() }));
    }
    setView("table");
  };

  const handleStatusChipClick = (status) => {
    if (tempStatus.includes(status)) {
      setTempStatus(tempStatus.filter((s) => s !== status));
    } else {
      setTempStatus([...tempStatus, status]);
    }
  };

  const filteredProjects = projects.filter((p) => {
    let matchesStatus =
      statusFilter.length > 0 ? statusFilter.includes(p.status) : true;
    let matchesDate = dateFilter
      ? dayjs(p.dueDate).isSame(dayjs(dateFilter), "day")
      : true;
    return matchesStatus && matchesDate;
  });

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedProjects = filteredProjects.slice(start, end);
  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);

  // Default columns
  const defaultColumns = {
    customerName: true,
    refNumber: true,
    projectName: true,
    projectNumber: true,
    projectLocation: true,
    address: true,
    dueDate: true,
    contact: true,
    status: true,
  };

  const [columns, setColumns] = useState(defaultColumns);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempColumns, setTempColumns] = useState(defaultColumns);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const statusOptions = ["Completed", "In Transit", "Processing", "Rejected", "On Hold"];

  const handleChipClick = (col) => {
    setTempColumns({ ...tempColumns, [col]: !tempColumns[col] });
  };

  const handleApply = () => {
    setColumns({ ...tempColumns });
    setModalOpen(false);
  };

  // 🔹 Render form if Add/Edit is active
  if (view === "form") {
    return (
      <Box p={3}>
        <ProjectForm
          initialValues={editData}
          onSubmit={handleSubmit}
          onCancel={() => setView("table")}
        />
      </Box>
    );
  }

  // 🔹 Otherwise render the table
  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Projects
      </Typography>

      {/* Filter Bar */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        p={2}
        component={Paper}
        sx={{ border: "1px solid #ddd" }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <FilterListIcon />
          </IconButton>

          <TextField
            type="date"
            size="small"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(0);
            }}
          />

          <Button
            size="large"
            variant="text"
            onClick={() => {
              setTempColumns({ ...columns });
              setModalOpen(true);
            }}
            style={{ textTransform: "capitalize" }}
          >
            Hide Columns
          </Button>

          <Button
            size="large"
            variant="text"
            onClick={() => setStatusModalOpen(true)}
            style={{ textTransform: "capitalize" }}
          >
            Status
          </Button>

          <Button
            variant="text"
            startIcon={<ReplayIcon />}
            onClick={() => {
              setStatusFilter("");
              setDateFilter("");
              setPage(0);
            }}
            color="error"
          >
            Reset Filter
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "capitalize" }}
          onClick={handleAdd}
        >
          Add Project
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.customerName && (
                <TableCell rowSpan={2} align="center" sx={{ fontWeight: 700 }}>
                  CUSTOMER
                </TableCell>
              )}
              {columns.refNumber && (
                <TableCell rowSpan={2} align="center" sx={{ fontWeight: 700 }}>
                  REF NUMBER
                </TableCell>
              )}
              {(columns.projectName || columns.projectNumber) && (
                <TableCell colSpan={2} align="center" sx={{ fontWeight: 700 }}>
                  PROJECT REFERENCE
                </TableCell>
              )}
              {(columns.projectLocation || columns.address) && (
                <TableCell colSpan={2} align="center" sx={{ fontWeight: 700 }}>
                  PROJECT LOCATION
                </TableCell>
              )}
              {columns.dueDate && (
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  DUE DATE
                </TableCell>
              )}
              {columns.contact && (
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  CONTACT
                </TableCell>
              )}
              {columns.status && (
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  STATUS
                </TableCell>
              )}
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                ACTIONS
              </TableCell>
            </TableRow>

            <TableRow>
              {columns.projectName && (
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  PROJECT NAME
                </TableCell>
              )}
              {columns.projectNumber && (
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  PROJECT NUMBER
                </TableCell>
              )}
              {columns.projectLocation && (
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  AREA LOCATION
                </TableCell>
              )}
              {columns.address && (
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  ADDRESS
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProjects.map((row) => (
              <TableRow key={row.id}>
                {columns.customerName && <TableCell>{row.customerName}</TableCell>}
                {columns.refNumber && <TableCell>{row.refNumber}</TableCell>}
                {columns.projectName && <TableCell>{row.projectName}</TableCell>}
                {columns.projectNumber && <TableCell>{row.projectNumber}</TableCell>}
                {columns.projectLocation && <TableCell>{row.projectLocation}</TableCell>}
                {columns.address && <TableCell>{row.address}</TableCell>}
                {columns.dueDate && <TableCell>{row.dueDate || "-"}</TableCell>}
                {columns.contact && <TableCell>{row.contact || "-"}</TableCell>}
                {columns.status && <TableCell>{row.status || "-"}</TableCell>}
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {paginatedProjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No projects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Showing {filteredProjects.length === 0 ? 0 : start + 1}–
          {Math.min(end, filteredProjects.length)} of {filteredProjects.length}
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

      {/* Column Selection Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2} fontWeight={700}>
            Select Columns
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {Object.keys(tempColumns).map((col) => (
              <Chip
                key={col}
                label={col.replace(/([A-Z])/g, " $1").toUpperCase()}
                color={tempColumns[col] ? "primary" : "default"}
                onClick={() => handleChipClick(col)}
                clickable
                variant={tempColumns[col] ? "filled" : "outlined"}
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Typography variant="caption" mb={2} fontWeight={700} color="#434343">
            *You can choose multiple Columns to hide
          </Typography>

          <Box mt={3} display="flex" justifyContent="center" gap={1}>
            <Button variant="contained" onClick={handleApply} sx={{ textTransform: "capitalize" }}>
              Apply Now
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Status Selection Modal */}
      <Modal open={statusModalOpen} onClose={() => setStatusModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2} fontWeight={700}>
            Select Status
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {statusOptions.map((status) => (
              <Chip
                key={status}
                label={status}
                color={tempStatus.includes(status) ? "primary" : "default"}
                onClick={() => handleStatusChipClick(status)}
                clickable
                variant={tempStatus.includes(status) ? "filled" : "outlined"}
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Typography variant="caption" mb={2} fontWeight={700} color="#434343">
            *You can choose multiple status
          </Typography>

          <Box mt={3} display="flex" justifyContent="center" gap={1}>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                setStatusFilter([...tempStatus]);
                setStatusModalOpen(false);
              }}
            >
              Apply Now
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
