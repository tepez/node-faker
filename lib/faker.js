var ObjectPath = require("object-path"),
  _ = require('lodash'),
  Joi = require('joi'),
  AngularExpressions = require('angular-expressions');


function Faker(locale, fallbackLocales) {

  fallbackLocales = fallbackLocales || [];

  Joi.assert(locale, Joi.string().required());
  Joi.assert(fallbackLocales, Joi.array());

  // default must always be in the locales
  if (locale !== 'default' && fallbackLocales.indexOf('default') === -1) {
    fallbackLocales.push('default');
  }

  var _this = this;

  this.locale = locale;
  this.fallbackLocales = fallbackLocales;
  this.catalog = {};

  this._transforms = {

    interpolate: function(str) {
      //                  {{ spaces key (defOpts)        spaces }}
      return str.replace(/{{\s*([\S]+?)(?:\(([\s\S]*?)\))?\s*}}/g, function (_match, key, defOpts) {
        if (!_.isUndefined(defOpts)) {
          defOpts = AngularExpressions.compile(defOpts)()
        }
        return _this.eval(key, defOpts);
      });
    },

    slugify: function(str) {
      // TODO?
      return str;
    },

    // Convert hash symbols to digits e.g. ### => 587
    numberify: function(str) {
      return str.replace(/#/g, function() {
        return Math.floor((Math.random() * 9) + 1);
      })
    },
    upperCase: function(str) {
      return str.toUpperCase();
    },
    lowerCase: function(str) {
      return str.toLowerCase();
    }
  };

}


Faker.prototype.registerTransformer = function (name, fn) {

  Joi.assert(name, Joi.string().required());
  Joi.assert(fn, Joi.func().required());

  this._transforms[name] = fn;
};


Faker.prototype.transform = function (str, transforms) {

  var _transforms = this._transforms;

  Joi.assert(str, Joi.string().required());
  Joi.assert(transforms, Joi.array().includes(Joi.string().valid(_.keys(_transforms))).required());

  var ret = str;
  _.forEach(transforms, function (transformName) {
    ret = _transforms[transformName](ret);
  });
  return ret;
};

Faker.prototype.eval = function (key, evalOpts) {
  Joi.assert(key, Joi.string().required());

  var allLocales = [ this.locale ].concat(this.fallbackLocales);

  for (var i = 0; i < allLocales.length; i++) {

    var currLocale = allLocales[i];

    var def = ObjectPath.get(this.catalog[currLocale], key);

    if (def == null) {
      continue;
    }

    var options, transforms = [ 'interpolate' ];

    if (_.isFunction(def))
      return def(evalOpts);

    else if (_.isArray(def))
      options = def;

    else if (_.isString(def))
      options = [ def ];

    else if (_.isPlainObject(def)) {
      Joi.assert(def, Joi.object().keys({
        transform: Joi.string().valid(_.keys(this._transforms)),
        transforms: Joi.array().includes(Joi.string().valid(_.keys(this._transforms))),
        options: Joi.array().includes(Joi.alternatives().try(Joi.string(), Joi.object()))
      }).nand('transform', 'transforms'));

      options = def.options;
      if (def.transform) {
        transforms = [ def.transform ]
      } else {
        transforms = def.transforms || [ 'interpolate' ]
      }
    } else {
      // TODO invalid def
      throw new Error('invalid def')
    }

    evalOpts = _.assign({ v: this.locale }, evalOpts);


    // select one of the possible options
    var option = options[Math.floor((Math.random() * (options.length)))];

    // TODO
    if (_.isPlainObject(option)) {
      option = option[evalOpts.v];
    }

    // pass the option through the transforms
    return this.transform(option, transforms);

  }

  // TODO missing key

  return '';

};


Faker.prototype.load = function(locale, catalog) {
  Joi.assert(locale, Joi.string().required());
  Joi.assert(catalog, Joi.object().required());

  if (!this.catalog[locale]) {
    this.catalog[locale] = {};
  }
  _.assign(this.catalog[locale], catalog);
};

module.exports = Faker;