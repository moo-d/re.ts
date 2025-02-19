const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Tambahkan cookie parser

// Routes
app.get('/', (req, res) => {
  const userCookie = req.cookies.user;
  if (userCookie) {
    res.redirect('/dashboard'); // Redirect to dashboard if user is logged in
  } else {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  const userCookie = req.cookies.user;
  if (userCookie) {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/course/introduction-html', (req, res) => {
  const userCookie = req.cookies.user;
  if (userCookie) {
    res.sendFile(path.join(__dirname, 'views', 'course', 'introduction-html.html'));
  } else {
    res.redirect('/login');
  }
})

// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('user'); // Clear user cookie on logout
  res.redirect('/login');
});

// POST routes for login and register
app.post('/login', authMiddleware.login);
app.post('/register', authMiddleware.register);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
