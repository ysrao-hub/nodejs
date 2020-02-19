const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, "sample-files")));
const PORT = 3000;
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.get(`/download/img`, (request, response) => {
    let fileName = 'sample-image-file.png';
    response.download(path.join(__dirname, "sample-files/" + fileName));
});

app.get(`/download/pdf`, (request, response) => {
    let fileName = 'sample-pdf-file.pdf';
    response.download(path.join(__dirname, "sample-files/" + fileName));
});