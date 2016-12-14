const cli = require('commander');
const sayHi = require('./say_hi');
const sayBye = require('./say_bye');

cli
  .command('hi')
  .description('says hi')
  .action(sayHi);

cli
  .command('bye')
  .description('says bye')
  .action(sayBye);

cli.parse(process.argv);
