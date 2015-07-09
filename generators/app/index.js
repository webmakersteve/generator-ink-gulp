'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var INK_VERSION = '1.0.5';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stellar ' + chalk.red('InkGulp') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    },

    projectfiles: function () {
      var done = this.async();

      this.fs.copy(
        this.templatePath('Gulpfile.js'),
        this.destinationPath('Gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      var inkUrl = 'http://zurb.com/ink/downloads/framework/ink-' + INK_VERSION + '.zip';
      this.extract(
        inkUrl,
        this.destinationPath('source/'),
        null,
        function() {
          done();
        }.bind(this)
      );
    }
  },

  install: function () {
    this.installDependencies({
      bower: false
    });

  }
});
