module.exports = {

  maleFirstName: require('./maleFirstNames.json'),
  femaleFirstName: require('./femaleFirstNames.json'),

  // we can't do:
  //  "{{ maleFirstName }}",
  //  "{{ femaleFirstName }}"
  // because we want to be able to ask for firstName({ v: 'en' })
  firstName: Array.prototype.concat.call([], require('./maleFirstNames.json'),
    require('./femaleFirstNames.json')),

  lastName: require('./lastNames.json'),

  fullName: [
    "{{ firstName }} {{ lastName }}"
  ],

  country: require('./countries.json'),
  city: require('./cities.json'),
  street: require('./streets.json'),
  streetNumber: {
    transform: 'numberify',
    options: [
      "#",
      "##",
      "##",
      "##",
      "1##"
    ]
  },

  zipCode: {
    transform: 'numberify',
    options: [
      "#######"
    ]
  },

  fixedLinePhone: {
    transform: 'numberify',
    options: [
      "02-###-####",
      "03-###-####",
      "04-###-####",
      "08-###-####",
      "09-###-####",
      "07#-###-####"
    ]
  },
  mobilePhone: {
    transform: 'numberify',
    options: [
      "050-###-####",
      "052-###-####",
      "053-###-####",
      "054-###-####",
      "055-###-####",
      "056-###-####",
      "057-###-####",
      "058-###-####",
      "059-###-####"
    ]
  },


  emailProvider: [
    "walla.co.il",
    "gmail.com",
    "yahoo.com",
    "hotmail.com"
  ],

  emailAddress: [
    "{{ username }}@{{ emailProvider }}"
  ],

  username: {
    transforms: [ 'numberify', 'interpolate', 'slugify' ],
    options: [
      // we don't have last names in english
      "{{ firstName({ v: 'en' }) }}##",
      "{{ firstName({ v: 'en' }) }}###",
      "{{ firstName({ v: 'en' }) }}####"
      //"{{ firstName({ v: 'en' }) }}.{{ lastName({ v: 'en' }) }}",
      //"{{ firstName({ v: 'en' }) }}_{{ lastName({ v: 'en' }) }}",
      //"{{ firstName({ v: 'en' }) }}_{{ lastName({ v: 'en' }) }}##",
      //"{{ firstName({ v: 'en' }) }}_{{ lastName({ v: 'en' }) }}##"
    ]
  },

  idNumber: {
    transform: 'numberify',
    options: [
      "#######",
      "########",
      "#########"
    ]
  }


};