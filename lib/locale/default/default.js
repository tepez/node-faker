var Chance = require('chance'),
  _ = require('lodash'),
  Joi = require('joi');


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
  'ipv6',
  'color'
], function(fn) {
  exports[fn] = _.bind(chance[fn], chance)
});

exports.pick = function (opts) {
  Joi.assert(opts, Joi.object().keys({
    options: Joi.array().required(),
    count: Joi.number().integer()
  }));

  return chance.pick(opts.options, opts.count);
};

// TODO pick