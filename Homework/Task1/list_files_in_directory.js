var fs = require('fs');
var path = require('path');
var dirPath = process.argv[2];
fs.readdir(dirPath, function (err, list) {
    if (err) {
        console.log("There is no such directory exists");
    } else {
        for (var i = 0; i < list.length; i++) {
            var fileName = path.join(dirPath, list[i]);
            console.log(fileName);
        }
    }
})
