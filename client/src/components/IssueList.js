// client/src/components/IssueList.js
import React from 'react';
import IssueItem from './IssueItem';

const IssueList = ({ issues, refresh }) => {
  return (
    <div>
      {issues.map(issue => (
        <IssueItem key={issue._id} issue={issue} refresh={refresh} />
      ))}
    </div>
  );
};

export default IssueList;