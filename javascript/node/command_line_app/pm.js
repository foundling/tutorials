const cli = require('commander');

cli
    .command('hi', 'says hi')
    .command('bye', 'says bye')
    .parse(process.argv);

