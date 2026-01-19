const express = require('express');
const cookieParser = require('cookie-parser'); // [cite: 18, 22]
const app = express(); // [cite: 25]

// Middleware to parse form data and cookies
app.use(express.urlencoded({ extended: true })); // [cite: 26]
app.use(cookieParser()); // [cite: 27]
app.use(express.static('public')); // [cite: 28]

// Login Route
app.post('/login', (req, res) => { // [cite: 29]
    // Destructure username and password from the body
    const { username, password } = req.body; // [cite: 30, 31]

    // Check credentials (guest / 1234)
    if (username === 'guest' && password === '1234') { // [cite: 32]
        // Create the cookie
        res.cookie('user', username); // [cite: 33]
        res.redirect('/private'); // [cite: 34]
    } else {
        res.send('Invalid username or password.'); // [cite: 36]
    }
});

// Private Route
app.get('/private', (req, res) => { // [cite: 39]
    // Get the user from the cookie
    const user = req.cookies.user; // [cite: 40, 42]

    if (user) { // [cite: 41]
        // Send welcome message using backticks for string interpolation
        res.send(`Welcome, ${user}! This is your private page.`); // [cite: 43]
    } else {
        res.redirect('/'); // [cite: 45]
    }
});

// Start server on port 8080
app.listen(8080, () => { // [cite: 48]
    console.log('Server running on http://localhost:8080');
});