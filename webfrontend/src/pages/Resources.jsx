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

            // Fetch resources from the API
            const apiEndpoint = `/api/resources${params.toString() ? `?${params.toString()}` : ""}`;
            const response = await fetch(apiEndpoint);

            if (!response.ok) {
                throw new Error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
            }

            // Log and parse the response conditionally
            const rawText = await response.text();
            console.log("Raw response text:", rawText);

            try {
                const data = JSON.parse(rawText);
                console.log("Parsed JSON data:", data);
                return data;
            } catch (error) {
                console.warn("Failed to parse JSON, returning raw text.");
                return rawText; // Return raw text if JSON parsing fails
            }
        } catch (err) {
            setError(err.message);
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
                        <button>View</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesPage;
