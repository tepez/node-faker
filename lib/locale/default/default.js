Chance = require('chance');
_ = require('lodash');


var chance = new Chance(),
  exports = module.exports = {};

_.forEach([
  'bool',
  'floating',
  'integer',
  'natural',
  'age',
  'birthday',
  'date',
  'year',
  'hour',
  'minute',
  'ip',
  'ipv6'
], function(fn) {
  exports[fn] = _.bind(chance[fn], chance)
});