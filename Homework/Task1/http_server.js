const https = require('https')
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/readfile',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end();

const server = https.createServer();
server.listen(3000);