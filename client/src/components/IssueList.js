// client/src/components/IssueList.js
import React from 'react';
import IssueItem from './IssueItem';

const IssueList = ({ issues, refresh }) => {
  if (issues.length === 0) {
    return (
      <div className="no-issues">
        <p>No issues found. Be the first to report an issue!</p>
      </div>
    );
  }

  return (
    <div className="issues-list">
      {issues.map(issue => (
        <IssueItem key={issue._id} issue={issue} refresh={refresh} />
      ))}
    </div>
  );
};

export default IssueList;