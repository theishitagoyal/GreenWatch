// server/models/Issue.js
const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    image: String,             // URL or Base64 (for simplicity, using URL)
    location: String,          // Could be textual or geographic coordinates
    priority: { type: Number, default: 0 },
    status: {
        type: String,
        default: "Open",
        enum: ["Open", "In-progress", "Resolved"]
    },
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', IssueSchema);