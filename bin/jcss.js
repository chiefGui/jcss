#! /usr/bin/env node

process.env.NODE_ENV = 'production';

var program   = require ('commander')
    , compile = require ('../lib/commands/compile');

program
  .version('0.0.1')
  .usage('[command] [options] <filename>');

program
  .option('-m, --min', 'Minifies the CSS output')
  .option('-o, --output', 'Specifies the name of CSS output file')
  .command('compile [options]')
  .description('Compiles the desired JCSS file.')
  .action(function (filename) {
    compile.compile(filename);
  });

program
  .command('help')
  .description('Show this help.')
  .action(function () {
    program.help();
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
};
