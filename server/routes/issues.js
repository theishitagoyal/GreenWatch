// server/routes/issues.js
const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// GET: Retrieve all issues (with optional filtering)
router.get('/', async (req, res) => {
    try {
        const filters = {};
        // Filtering by status, category, and priority if provided
        const { status, category, priority } = req.query;
        if (status) filters.status = status;
        if (category) filters.category = category;
        if (priority) filters.priority = priority;

        const issues = await Issue.find(filters);
        res.json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new issue
router.post('/', async (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        location: req.body.location,
        priority: req.body.priority,
        upvotes: 0
    });

    try {
        const newIssue = await issue.save();
        res.status(201).json(newIssue);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Update an issue (status update or upvote)
router.put('/:id', async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) return res.status(404).json({ message: "Issue not found" });

        // Update the status if provided
        if (req.body.status) {
            issue.status = req.body.status;
        }
        // Upvote increment, if flagged
        if (req.body.upvote) {
            issue.upvotes += 1;
        }

        const updatedIssue = await issue.save();
        res.json(updatedIssue);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;