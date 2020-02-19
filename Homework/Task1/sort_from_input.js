let argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

let mode = argv['mode'];
let givenArray = JSON.parse(argv['input']);
let output = "Output: ";
if (mode === 'asc') {
    output += custom_sort_asc(givenArray);
} else if (mode === 'desc') {
    output += custom_sort_desc(givenArray);
} else {
    output += "Invalid mode";
}

console.log(output);

function custom_sort_asc(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var swap = arr[i];
                arr[i] = arr[j];
                arr[j] = swap;
            }
        }
    }
    return arr;
}

function custom_sort_desc(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                var swap = arr[i];
                arr[i] = arr[j];
                arr[j] = swap;
            }
        }
    }
    return arr;
}