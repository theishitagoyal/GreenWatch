// client/src/components/IssueForm.js
import React, { useState } from 'react';

const IssueForm = ({ addIssue }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    location: '',
    priority: 0
  });

  // Update form data when the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit the form data to add a new issue
  const handleSubmit = (e) => {
    e.preventDefault();
    addIssue(formData);
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      location: '',
      priority: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="issue-form">
      <div className="form-group">
        <label htmlFor="title">Issue Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter issue title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue in detail"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          placeholder="e.g., potholes, illegal dumping"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Paste image URL here"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority (1-5)</label>
        <input
          type="number"
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          min="1"
          max="5"
          placeholder="1-5"
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit Issue
      </button>
    </form>
  );
};

export default IssueForm;