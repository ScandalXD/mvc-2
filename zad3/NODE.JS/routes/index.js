const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.renderPage('home');
});


router.get('/student', (req, res) => {
    res.renderPage('student');
});


router.post('/student', (req, res) => {
    
    res.redirect('/student'); 
});

module.exports = router;