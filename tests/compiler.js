process.env.NODE_ENV = 'development';

var expect     = require ('expect.js')
    , _        = require ('underscore')
    , compiler = require ('../lib/core/compiler');

describe ('The compiler', function () {
  beforeEach(function () {
    compiler.read(__dirname + '/styles');
  });

  afterEach(function () {
    compiler = require ('../lib/core/compiler');
  });

  it ('should read an exported module', function () {
    expect(compiler.jcss).to.be.an('object');
  });

  it ('should process the imported files', function () {
    expect(compiler.jcss.import).to.be(undefined);
  });

  it ('should process any JSON content into CSS', function () {
    compiler.contents = '';

    _.each(compiler.jcss, function (value, key) {
      compiler.contents += compiler.process(key, value);
    });

    expect(compiler.contents).to.be.a('string');
  });

  it ('should compile imported contents with the styles of the file itself', function () {
    compiler.read(__dirname + '/styles').compile();
  });
});
