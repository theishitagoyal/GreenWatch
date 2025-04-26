// client/src/components/IssueItem.js
import React from 'react';
import axios from 'axios';

const IssueItem = ({ issue, refresh }) => {
  const handleUpvote = async () => {
    try {
      await axios.put(`/api/issues/${issue._id}`, { upvote: true });
      refresh();
    } catch (error) {
      console.error("Error upvoting issue:", error);
    }
  };

  const handleStatusChange = async (e) => {
    try {
      await axios.put(`/api/issues/${issue._id}`, { status: e.target.value });
      refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      margin: '10px 0'
    }}>
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>
      <p><strong>Category:</strong> {issue.category} | <strong>Location:</strong> {issue.location}</p>
      <p><strong>Priority:</strong> {issue.priority} | <strong>Status:</strong> {issue.status}</p>
      <p><strong>Upvotes:</strong> {issue.upvotes}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <select value={issue.status} onChange={handleStatusChange}>
        <option value="Open">Open</option>
        <option value="In-progress">In-progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
};

export default IssueItem;