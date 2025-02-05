import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    contentType: "",
    content: "",
    contentURL: "",
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

  /*const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the changed field is 'publishedDt'
    if (name === 'publishedDt') {
      // Handle the date input change
      setFormData({ ...formData, [name]: value });
    } else {
      // For other fields, apply the normal change logic
      setFormData({ ...formData, [name]: value });
    }
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
      setFormData({ title: "", description: "", category: "", contentType: "", content: "", contentURL: "", thumbnailURL: "", author: "", publishedDt: "" });
    } catch (error) {
      console.error("Error saving resource", error.response ? error.response.data : error.message);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // Adjust format as needed
  }; 

  const handleEdit = (index) => {
    const resource = resources[index];
  
    // Ensure the publishedDt is in the correct format for the date input
    const formattedDate = resource.publishedDt ? new Date(resource.publishedDt).toISOString().split('T')[0] : '';
  
    setFormData({
      ...resource,
      publishedDt: formattedDate, // Set the formatted date
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
          <TextField fullWidth margin="dense" label="Content URL" name="contentURL" value={formData.contentURL} onChange={handleChange} />
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
                    { /* <TableCell>{res.publishedDt ? new Date(res.publishedDt).toISOString().split("T")[0] : "N/A"}</TableCell>*/ }
                    <TableCell>{res.publishedDt ? new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(new Date(res.publishedDt)) : "N/A"}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(index)} color="secondary" startIcon={<EditIcon />}>Edit</Button>
                      <Button onClick={() => handleDelete(res._id)} color="error" startIcon={<DeleteIcon />}>Delete</Button>
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
