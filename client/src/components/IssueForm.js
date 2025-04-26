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
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input type="text" name="title" placeholder="Issue Title" value={formData.title} onChange={handleChange} required /><br />
      <textarea name="description" placeholder="Issue Description" value={formData.description} onChange={handleChange} /><br />
      <input type="text" name="category" placeholder="Category (e.g., potholes, illegal dumping)" value={formData.category} onChange={handleChange} required /><br />
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} /><br />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} /><br />
      <input type="number" name="priority" placeholder="Priority (number)" value={formData.priority} onChange={handleChange} min="0" /><br />
      <button type="submit">Submit Issue</button>
    </form>
  );
};

export default IssueForm;