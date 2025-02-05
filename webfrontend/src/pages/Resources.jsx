import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, TextField, MenuItem, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState({ contentType: "" });
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchResources = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append("query", searchQuery);
            if (filter.contentType) params.append("contentType", filter.contentType);

            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
            const apiEndpoint = `${API_BASE_URL}/api/resources${params.toString() ? `?${params.toString()}` : ""}`;
            const response = await fetch(apiEndpoint);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setResources(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchResources();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, filter]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter({ contentType: event.target.value });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                Resources
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        select
                        label="Filter by Type"
                        variant="outlined"
                        value={filter.contentType}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="article">Articles</MenuItem>
                        <MenuItem value="book">Books</MenuItem>
                        <MenuItem value="video">Videos</MenuItem>
                        <MenuItem value="podcast">Podcasts</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && resources.length === 0 && (
                <Typography align="center" color="textSecondary">No resources found.</Typography>
            )}
            <Grid container spacing={3}>
                {resources.map((resource) => (
                    <Grid item xs={12} sm={6} md={4} key={resource.id || resource._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent>
                                <Typography variant="h6" color="secondary" gutterBottom>
                                    {resource.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {resource.description}
                                </Typography>
                                <Typography variant="body2" color="primary" gutterBottom>
                                    Type: {resource.contentType}
                                </Typography>
                            </CardContent>
                            <Button
                                sx={{ m: 2 }}
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => navigate(`/resources/${resource.id || resource._id}`)}
                            >
                                Read More
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ResourcesPage;
