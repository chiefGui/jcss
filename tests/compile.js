process.env.NODE_ENV = 'development';

var expect    = require ('expect.js')
    , compile = require ('../lib/commands/compile');

describe ('The compile command', function () {
  it ('should call the Compiler', function () {
    expect(compile.compile(__dirname + '/styles')).to.be(true);
  });
});
