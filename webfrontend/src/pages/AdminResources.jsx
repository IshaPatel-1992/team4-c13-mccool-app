import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";



export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    contentType: "",
    content: "",
    contentUrl: "",
    thumbnailURL:"",
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
      //console.log("Resources", response.data);
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editIndex !== null) {
        const resourceId = resources[editIndex]._id;
        //console.log("Resource ID to update:", resourceId);
        //console.log("Data to send:", formData);
  
        const response = await axios.put(`${API_BASE_URL3}/api/resources/${resourceId}`, formData);
        console.log("Resource updated:", response.data);
      } else {
        console.log("Adding new resource:", formData);
        await axios.post(`${API_BASE_URL3}/api/resources`, formData);
      }
      fetchResources();
      setEditIndex(null);
      setDialogOpen(false);
      setFormData({ title: "", description: "", category: "", contentType: "", content: "", contentUrl: "", thumbnailURL: "", author: "", publishedDt: "" });
    } catch (error) {
      console.error("Error saving resource", error.response ? error.response.data : error.message);
    }
  };
  

  const handleEdit = (index) => {
    setFormData(resources[index]);
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
    <div className="p-6">
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Add Resource</Button>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editIndex !== null ? "Edit Resource" : "Add Resource"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Title" name="title" value={formData.title} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Description" name="description" value={formData.description} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Category" name="category" value={formData.category} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Content Type" name="contentType" value={formData.contentType} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Content" name="content" value={formData.content} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Content URL" name="contentUrl" value={formData.contentUrl} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="thumbnail URL" name="thumbnailURL" value={formData.thumbnailURL} onChange={handleChange} />          
          <TextField fullWidth margin="dense" label="Author" name="author" value={formData.author} onChange={handleChange} />
          <TextField fullWidth margin="dense" type="date" name="publishedDt" value={formData.publishedDt} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Tags" name="tags" value={formData.tags} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">{editIndex !== null ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>

      <Card className="mt-6">
        <CardContent>
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
                    <TableCell>{res.publishedDt}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(index)} color="secondary">Edit</Button>
                      <Button onClick={() => handleDelete(res._id)} color="error">Delete</Button>
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
