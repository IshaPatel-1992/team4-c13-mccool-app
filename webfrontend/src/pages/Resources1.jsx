import React, { useState } from "react";
import "./ResourcesPage.css";

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ topic: "", author: "", date: "" });

  const resources = [
    {
      id: 1,
      title: "Understanding React",
      description: "A comprehensive guide to mastering React.js.",
      type: "Article",
      author: "John Doe",
      date: "2024-05-15",
    },
    {
      id: 2,
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript programming.",
      type: "Blog",
      author: "Jane Smith",
      date: "2023-11-20",
    },
    {
      id: 3,
      title: "Web Development Tools",
      description: "Top tools to boost your productivity as a web developer.",
      type: "Tool",
      author: "Tech Innovators",
      date: "2025-01-10",
    },
  ];
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const filteredResources = resources.filter((resource) => {
    return (
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filter.topic || resource.type === filter.topic) &&
      (!filter.author || resource.author === filter.author) &&
      (!filter.date || resource.date === filter.date)
    );
  });

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
          value={filter.topic}
          onChange={(e) => handleFilterChange("topic", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Article">Articles</option>
          <option value="Book">Books</option>
          <option value="Video">Videos</option>
          <option value="Tool">Tools</option>
        </select>
        <select
          value={filter.author}
          onChange={(e) => handleFilterChange("author", e.target.value)}
        >
          <option value="">All Authors</option>
          <option value="John Doe">John Doe</option>
          {/* Add more authors dynamically */}
        </select>
        <input
          type="date"
          value={filter.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
        />
      </div>
      <div className="resource-list">
        {filteredResources.map((resource) => (
          <div className="resource-card" key={resource.id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <p><strong>Type:</strong> {resource.type}</p>
            <p><strong>Author:</strong> {resource.author}</p>
            <p><strong>Date:</strong> {resource.date}</p>
            <button>Mark as Favourite</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
