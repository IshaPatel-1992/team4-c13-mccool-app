import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import "./QuickSearchBar.css";
import { FaSearch } from "react-icons/fa";

const QuickSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const tips = {
    "compassionate leadership": [
      "Listen actively to your team.",
      "Show empathy towards challenges.",
      "Encourage open communication.",
      "Lead by example with kindness.",
      "Support personal and professional growth.",
      "Address conflicts with understanding and patience.",
      "Provide resources for skill-building and career growth.",
      "Recognize individual contributions within the team.",
    ],
    "team motivation": [
      "Set clear and achievable goals.",
      "Recognize and reward achievements.",
      "Foster a collaborative environment.",
      "Provide constructive feedback.",
      "Encourage creativity and innovation.",
      "Empower team members with ownership of projects.",
      "Celebrate milestones together as a team.",
      "Maintain transparency in communication and decisions.",
    ],
    "team motivation 2": [
      "Recognize and reward achievements.",
      "Foster a collaborative environment.",
      "Provide constructive feedback.",
      "Encourage creativity and innovation.",
      "Empower team members with ownership of projects.",
      "Celebrate milestones together as a team.",
      "Maintain transparency in communication and decisions.",
    ],
    "decision making 1": [
      "Gather all relevant facts before making a decision.",
      "Weigh the pros and cons of each option.",
      "Consider input from key stakeholders.",
      "Align decisions with organizational goals.",
    ],
    "stress management 2": [
      "Promote work-life balance.",
      "Encourage regular breaks.",
      "Provide resources for mental health.",
      "Lead relaxation or mindfulness activities.",
      "Create a supportive work culture.",
      "Set realistic deadlines and expectations.",
      "Offer flexible working arrangements when possible.",
      "Organize team-building or stress-relief activities.",
    ],
    "team motivation 3": [
      "Recognize and reward achievements.",
      "Foster a collaborative environment.",
      "Provide constructive feedback.",
      "Encourage creativity and innovation.",
      "Empower team members with ownership of projects.",
      "Celebrate milestones together as a team.",
    ],
    "effective communication": [
      "Be clear and concise in your messaging.",
      "Use active listening to understand team concerns.",
      "Ask clarifying questions to avoid misunderstandings.",
      "Provide regular updates to keep everyone informed.",
      "Adapt your communication style based on the audience.",
      "Use non-verbal cues effectively during conversations.",
      "Encourage feedback to ensure mutual understanding.",
      "Practice empathy in every interaction.",
    ],
    "decision making": [
      "Gather all relevant facts before making a decision.",
      "Weigh the pros and cons of each option.",
      "Consider input from key stakeholders.",
      "Align decisions with organizational goals.",
      "Be transparent about your decision-making process.",
      "Take responsibility for outcomes, whether positive or negative.",
      "Learn from past decisions to improve future ones.",
      "Balance intuition with data-driven insights.",
    ],
    "time management": [
      "Prioritize tasks using tools like the Eisenhower Matrix.",
      "Break down large tasks into smaller, manageable steps.",
      "Set specific, achievable deadlines for each task.",
      "Minimize distractions during focused work periods.",
      "Use productivity techniques like Pomodoro or time-blocking.",
      "Delegate tasks when appropriate to free up time.",
      "Review and adjust your schedule regularly.",
      "Avoid multitasking to maintain focus and quality.",
    ],
    "stress management": [
      "Promote work-life balance.",
      "Encourage regular breaks.",
      "Provide resources for mental health.",
      "Lead relaxation or mindfulness activities.",
      "Create a supportive work culture.",
      "Set realistic deadlines and expectations.",
      "Offer flexible working arrangements when possible.",
      "Organize team-building or stress-relief activities.",
    ],
    "conflict resolution": [
      "Address conflicts promptly to prevent escalation.",
      "Listen to all parties involved without bias.",
      "Focus on the issue, not the individuals.",
      "Find common ground and build on shared goals.",
      "Encourage open and respectful dialogue.",
      "Collaborate on solutions that benefit everyone.",
      "Document agreements and next steps clearly.",
      "Seek help from a mediator if needed.",
    ],
    "personal development": [
      "Set SMART goals for professional growth.",
      "Seek feedback regularly to identify improvement areas.",
      "Read books and articles related to your field.",
      "Take online courses to learn new skills.",
      "Attend workshops, webinars, or conferences.",
      "Network with professionals in your industry.",
      "Reflect on successes and failures to gain insights.",
      "Maintain a growth mindset and embrace challenges.",
    ],
    "inspiring innovation": [
      "Encourage brainstorming sessions without judgment.",
      "Provide resources and tools to support creativity.",
      "Reward innovative ideas, even if they fail.",
      "Create a safe space for experimentation.",
      "Learn from competitors and adapt their strengths.",
      "Involve diverse perspectives in ideation processes.",
      "Promote a culture of continuous learning.",
      "Allocate time for teams to work on passion projects.",
    ],
  };

  const validateInput = (input) => {
    if (!input.trim()) {
      setError("Search input cannot be empty.");
      return false;
    }
    if (input.trim().length < 3) {
      setError("Input must be at least 3 characters long.");
      return false;
    }
    if (input.trim().length >= 100) {
      setError("Input should be less than 100 characters long.");
      return false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(input)) {
      setError("Input contains invalid characters. Use letters and numbers only.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSearch = () => {
    if (!validateInput(searchQuery)) return;

    const filteredResults = Object.keys(tips).filter((key) =>
      key.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredResults.length > 0) {
      setResult(filteredResults.map((key) => tips[key]).flat());
    } else {
      setResult(["No tips found. Try another query."]);
    }
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const updateSuggestions = (query) => {
    if (query.trim().length < 3) {
      setError("Keep typing... Minimum 3 characters required.");
      setSuggestions([]);
      return;
    }

    setError("");
    const filteredSuggestions = Object.keys(tips).filter((key) =>
      key.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const debouncedUpdateSuggestions = useCallback(
    debounce((query) => updateSuggestions(query), 300),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedUpdateSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setResult(null);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && activeIndex !== -1) {
      setSearchQuery(suggestions[activeIndex]);
      setSuggestions([]);
      setActiveIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="search-container">
      <div className="search-row">
        <input
          type="text"
          placeholder="How can we help you improve today?"
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Search tips input field"
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch /> Search
        </button>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list" role="listbox">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              role="option"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

{result && (
        <div className="result-container">
          <h4>{searchQuery}</h4>
          <ul>
            {result.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuickSearchBar;
