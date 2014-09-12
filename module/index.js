'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor() {
  var done = this.async();
  var name = this.name;
  var prompts = [
    {
      name: 'name',
      message: 'What is this name of this module?',
      default: name
    },{
      name: 'dir',
      message: 'Where would you like to put this module?',
      default: 'client/app/modules'
    },
  ];
  this.prompt(prompts, function (props){


    this.dir = path.join(props.dir, this.name);
    done();
  }.bind(this));

};
Generator.prototype.createFiles = function createFiles() {
  var dest = this.dir;
  this.sourceRoot(path.join(__dirname, './templates'));
  ngUtil.processDirectory(this, '.', dest);
};