const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/colleges', require('./routes/colleges'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/exams', require('./routes/exams'));

app.use('/api/loans', require('./routes/loans'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/admin', require('./routes/admin'));

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'home', 'home.html'));
});

app.get('/programs', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'programs', 'programs.html'));
});

app.get('/colleges', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'colleges', 'colleges.html'));
});

app.get('/college/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'college-detail', 'college-detail.html'));
});

// Dedicated college detail page by slug (template-driven)
app.get('/colleges/:slug', (req, res, next) => {
    // Skip if slug looks like a static file extension
    if (req.params.slug.includes('.')) return next();
    res.sendFile(path.join(__dirname, '..', 'frontend', 'college-detail', 'college-detail.html'));
});

app.get('/compare', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'compare', 'compare.html'));
});

app.get('/budget-loan', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'budget-loan', 'budget-loan.html'));
});

app.get('/exams', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'exams', 'exams.html'));
});



app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'auth', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'auth', 'signup.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dashboard', 'dashboard.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'admin', 'admin.html'));
});

// 404 handler
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ success: false, message: 'API endpoint not found' });
    }
    res.status(404).sendFile(path.join(__dirname, '..', 'frontend', 'errors', '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`NextCampus server running on http://localhost:${PORT}`);
});
