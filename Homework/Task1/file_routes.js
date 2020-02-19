const http = require('http');
const fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');

const server = http.createServer();
server.on('request', (req, res) => {
  var q = url.parse(req.url, true);
  var pathName = q.pathname;
  if (pathName === '/readfile' && req.method == 'GET') {
    var queryObject = q.query;
    var fileName = queryObject.filename;
    filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        res.write(data);
      } else {
        if (err.code === 'ENOENT') {
          res.write('File not found!');
        } else {
          throw err;
        }
      }
      res.end();
    });
  } else if (req.url === '/writefile' && req.method == 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = querystring.parse(body);
      filePath = path.join(__dirname, body.filename);
      fs.writeFile(filePath, body.content, function (err) {
        if (err) throw err;
      });
      return res.end(`Content is written in file`);
    });
  } else if (req.url === '/deletefile' && req.method == 'DELETE') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = querystring.parse(body);
      filePath = path.join(__dirname, body.filename);
      fs.unlink(filePath, function (err) {
        if (err) {
          if (err.code === 'ENOENT') {
            res.write('File not found!');
          } else {
            throw err;
          }
        }
      });
      return res.end(`File deleted!`);
    });
  } else {
    res.write('Invalid request');
  }
});

server.listen(3000);