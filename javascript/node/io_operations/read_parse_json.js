if (!process.argv[2]) {
    console.log('node read_parse_json.js [filename]'), process.exit(1);
}

var fs = require('fs');
var filename = process.argv[2];

fs.readFile(filename,'utf8', (err, json) => {
    if (err) throw err;
    console.log('filetype: ', typeof JSON.parse(json), '\nfile: *************\n', JSON.parse(json));
});
