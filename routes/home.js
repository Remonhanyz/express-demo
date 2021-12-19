const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'}) //to render a specific HTML file
});

module.exports = router;