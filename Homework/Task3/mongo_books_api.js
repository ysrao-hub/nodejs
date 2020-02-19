const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json({
    limit: '10MB'
}));

var curdRoutes = require('./router');

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.urlencoded());

const PORT = 3000;
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

// use the router and 401 anything falling through
app.use('/books', curdRoutes, function (req, res) {
  res.sendStatus(401)
})