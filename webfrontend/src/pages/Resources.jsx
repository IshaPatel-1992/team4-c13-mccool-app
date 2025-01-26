import React, { useState, useEffect } from "react";
import { Heart, Save, Eye, Download, Star } from "lucide-react"; // Lucide icons
import "../pages/Resources.css"; // Add CSS styles for the page
import { useNavigate } from "react-router-dom"; // React Router for navigation

const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState({ contentType: "", tags: "" });
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const fetchResources = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append("query", searchQuery);
            if (filter.contentType) params.append("contentType", filter.contentType);
            if (filter.tags) params.append("tags", filter.tags);

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
            console.error("Error fetching resources:", err);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchResources();
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, filter]);

    // Update search query
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (key, value) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
    };

    const handleViewClick = (id) => {
        navigate(`/resources/:id`); // Navigate to the resource detail page
    };

    return (
        <div className="resources-page">
            <h1>Resources</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery} // Correct binding to `searchQuery`
                    onChange={handleSearchChange} // Use onChange for proper two-way binding
                />
                <select
                    value={filter.contentType}
                    onChange={(e) => handleFilterChange("contentType", e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Article">Articles</option>
                    <option value="Book">Books</option>
                    <option value="Video">Videos</option>
                    <option value="Tool">Tools</option>
                </select>
            </div>
            <div className="resource-list">
                {loading && <p>Loading resources...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && resources.length === 0 && <p>No resources found.</p>}
                {!loading && !error && resources.map((resource) => (
                    <div className="resource-card" key={resource.id}>
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                        <p><strong>Type:</strong> {resource.contentType}</p>
                        <div className="actions">
                            <Heart className="icon" title="Mark as Favourite" />
                            <Save className="icon" title="Save" />
                            <Eye 
                                className="icon" 
                                title="View" 
                                onClick={() => handleViewClick(resource.id)} // Navigate on click
                            />
                            <Download className="icon" title="Download" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesPage;
