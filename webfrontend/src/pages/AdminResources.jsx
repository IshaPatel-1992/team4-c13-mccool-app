import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    contentType: "",
    content: "",
    contentURL: "",
    thumbnailURL: "",
    author: "",
    publishedDt: "",
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const API_BASE_URL3 = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL3}/api/resources`);
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editIndex !== null) {
        const resourceId = resources[editIndex]._id;
        await axios.put(`${API_BASE_URL3}/api/resources/${resourceId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL3}/api/resources`, formData);
      }
      fetchResources();
      setEditIndex(null);
      setDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        contentType: "",
        content: "",
        contentURL: "",
        thumbnailURL: "",
        author: "",
        publishedDt: "",
      });
    } catch (error) {
      console.error("Error saving resource", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (index) => {
    const resource = resources[index];
    setFormData({
      ...resource,
      publishedDt: resource.publishedDt ? new Date(resource.publishedDt).toISOString().split("T")[0] : "",
    });
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL3}/api/resources/${id}`);
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setDialogOpen(true)}>
        Add Resource
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editIndex !== null ? "Edit Resource" : "Add Resource"}</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              fullWidth
              margin="dense"
              label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              type={key === "publishedDt" ? "date" : "text"}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{editIndex !== null ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>

      <Card style={{ marginTop: "20px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Resource List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Published</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resources.map((res, index) => (
                  <TableRow key={res._id}>
                    <TableCell>{res.title}</TableCell>
                    <TableCell>{res.author}</TableCell>
                    <TableCell>{res.contentType}</TableCell>
                    <TableCell>{res.publishedDt ? new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(new Date(res.publishedDt)) : "N/A"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(index)} color="primary"><Edit /></IconButton>
                      <IconButton onClick={() => handleDelete(res._id)} color="error"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
