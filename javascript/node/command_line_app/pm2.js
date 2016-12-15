const cli = require('commander');

const makeLoader = function(path) {

    return function(...args) {
        require(path).apply(this, args);
    };

};

cli
    .command('hi')
    .description('says hi')
    .action(makeLoader('./pm-hi'));

cli
    .command('bye')
    .description('says bye')
    .action(makeLoader('./pm-bye'));

cli.parse(process.argv);
