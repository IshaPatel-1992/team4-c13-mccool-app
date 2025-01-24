
import React, { useState, useEffect } from "react";
import "./ResourcesPage.css"; // Add CSS styles for the page


const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState({ contentType: "", tags: "" });
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchResources = async () => {
        setLoading(true);
        setError("");
    
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append("query", searchQuery);
            if (filter.contentType) params.append("contentType", filter.contentType);
            if (filter.tags) params.append("tags", filter.tags);
    
            // Log the request details
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
            const apiEndpoint = `${API_BASE_URL}/api/resources${params.toString() ? `?${params.toString()}` : ""}`;
            //const apiEndpoint = `http://localhost:4000/api/resources${params.toString() ? `?${params.toString()}` : ""}`;
            //console.log("Fetching resources with URL:", apiEndpoint);
    
            // Fetch resources from the API
            const response = await fetch(apiEndpoint);
    
            // Log the response type and status
            //console.log("Response type:", response.type);
            //console.log("Response status:", response.status);
    
            if (!response.ok) {
                throw new Error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
            }
    
            const rawText = await response.text();
            //console.log("Raw response text:", rawText);
    
            try {
                const data = JSON.parse(rawText);
                //console.log("Parsed JSON data:", data);
                setResources(data);
            } catch (error) {
                console.warn("Failed to parse JSON, returning raw text.");
                setResources([]); // Optionally handle raw text as a fallback
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching resources:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, [searchQuery, filter]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (key, value) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="resources-page">
            <h1>Resources</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                        <button>Mark as Favourite</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesPage;
