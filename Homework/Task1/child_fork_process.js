console.log("Node Version: ", process.version);

const os = require('os')
const cpuCount = os.cpus().length

console.log("number of cores in CPU: ", cpuCount);