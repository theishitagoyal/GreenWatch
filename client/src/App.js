// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';
import './App.css';

function App() {
  const [issues, setIssues] = useState([]);

  // Fetch issues from the server
  const fetchIssues = async () => {
    try {
      const res = await axios.get('/api/issues');
      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
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
    } catch (error) {
      console.error("Error adding an issue:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GreenWatch: Report & Track Local Environmental Issues</h1>
      <IssueForm addIssue={addIssue} />
      <IssueList issues={issues} refresh={fetchIssues} />
    </div>
  );
}

export default App;