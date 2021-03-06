var Faker = require('./faker');

// get a new faker instance
var faker = new Faker('he');

// load the core definitions
faker.load('he', require('./locale/he/he.js'));
faker.load('default', require('./locale/default/default.js'));

module.exports = faker;

