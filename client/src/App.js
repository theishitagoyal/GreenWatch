// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';
import './App.css';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Fetch issues from the server
  const fetchIssues = async () => {
    try {
      const res = await axios.get('/api/issues');
      setIssues(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching issues:", error.response?.data || error.message);
      setError("Failed to fetch issues. Please try again later.");
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Method to add a new issue
  const addIssue = async (issueData) => {
    try {
      const res = await axios.post('/api/issues', issueData);
      setIssues([...issues, res.data]);
      setError(null);
    } catch (error) {
      console.error("Error adding an issue:", error.response?.data || error.message);
      setError("Failed to add issue. Please try again.");
    }
  };

  // Filter issues by status
  const filteredIssues = selectedStatus === 'all' 
    ? issues 
    : issues.filter(issue => issue.status.toLowerCase() === selectedStatus);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GreenWatch</h1>
        <p className="subtitle">Report & Track Local Environmental Issues</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="status-filter">
        <button 
          className={`status-btn ${selectedStatus === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('all')}
        >
          All Issues
        </button>
        <button 
          className={`status-btn ${selectedStatus === 'open' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('open')}
        >
          Open
        </button>
        <button 
          className={`status-btn ${selectedStatus === 'in-progress' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('in-progress')}
        >
          In Progress
        </button>
        <button 
          className={`status-btn ${selectedStatus === 'resolved' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('resolved')}
        >
          Resolved
        </button>
      </div>

      <div className="content-container">
        <div className="form-container">
          <h2>Report New Issue</h2>
          <IssueForm addIssue={addIssue} />
        </div>
        
        <div className="issues-container">
          <h2>Current Issues</h2>
          <IssueList issues={filteredIssues} refresh={fetchIssues} />
        </div>
      </div>
    </div>
  );
}

export default App;