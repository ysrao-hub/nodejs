var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('hello, get !')
})

router.get('/:id', function (req, res) {
    res.send('hello, id!')
})

module.exports = router;