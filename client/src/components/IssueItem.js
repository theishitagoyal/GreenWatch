// client/src/components/IssueItem.js
import React from 'react';
import axios from 'axios';

const IssueItem = ({ issue, refresh }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`/api/issues/${issue._id}`, { status: newStatus });
      refresh();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleUpvote = async () => {
    try {
      await axios.put(`/api/issues/${issue._id}`, { upvote: true });
      refresh();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return '#e74c3c';
      case 'in-progress':
        return '#f39c12';
      case 'resolved':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="issue-card">
      <div className="issue-header">
        <h3>{issue.title}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(issue.status) }}
        >
          {issue.status}
        </span>
      </div>

      <div className="issue-content">
        <p className="description">{issue.description}</p>
        
        {issue.image && (
          <div className="issue-image">
            <img src={issue.image} alt={issue.title} />
          </div>
        )}

        <div className="issue-details">
          <div className="detail-item">
            <span className="label">Category:</span>
            <span className="value">{issue.category}</span>
          </div>
          <div className="detail-item">
            <span className="label">Location:</span>
            <span className="value">{issue.location}</span>
          </div>
          <div className="detail-item">
            <span className="label">Priority:</span>
            <span className="value">{issue.priority}</span>
          </div>
          <div className="detail-item">
            <span className="label">Upvotes:</span>
            <span className="value">{issue.upvotes}</span>
          </div>
        </div>
      </div>

      <div className="issue-actions">
        <button 
          className="upvote-btn"
          onClick={handleUpvote}
        >
          👍 Upvote ({issue.upvotes})
        </button>

        <div className="status-actions">
          <button 
            className={`status-btn ${issue.status === 'Open' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Open')}
          >
            Open
          </button>
          <button 
            className={`status-btn ${issue.status === 'In-progress' ? 'active' : ''}`}
            onClick={() => handleStatusChange('In-progress')}
          >
            In Progress
          </button>
          <button 
            className={`status-btn ${issue.status === 'Resolved' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Resolved')}
          >
            Resolved
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueItem;