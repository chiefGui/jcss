var _    = require ('underscore')
    , fs = require ('fs');

module.exports = {
  contents: '',
  read: function (filename) {
    if ('production' === process.env.NODE_ENV) {
      filename = process.cwd() + '/' + filename;
    };

    this.jcss = require (filename);
    return this;
  },
  import: function () {
    this.jcss.import.forEach(function (items) {
      _.each(items, function (value, key) {
        this.contents += this.process(key, value);
      }, this);
    }, this);

    delete this.jcss.import;
  },
  processDetailedProperties: function (key, values) {
    var result;

    _.each(values, function (value, property) {
      result = key + '-' + property + ': ' + value;
    });

    return result;
  },
  process: function (elementName, properties) {
    var elementHeader    = elementName + ' {\n'
        , elementContent = ''
        , elementFooter  = '}\n\n';

    _.each(properties, function (value, key) {
      if (typeof(value) === 'object') {
        var pair = this.processDetailedProperties (key, value);
      };

      var property = typeof (value) !== 'object' ? key + ': ' + value : pair;

      elementContent += '  ' + property + ';\n';
    }, this);

    return elementHeader + elementContent + elementFooter;
  },
  compile: function () {
    if (this.jcss.hasOwnProperty('import')) {
      this.import();
    };

    _.each(this.jcss, function (value, key) {;
      this.contents += this.process(key, value);
    }, this);

    fs.writeFile(process.cwd() + '/output.css', this.contents);
  }
};
