var expect = require('chai').expect,
  Faker = require('../lib/faker');
  DefaultFaker = require('..');


describe ('Faker', function() {

  describe('.transform', function() {
    it('should pass given value through the transforms', function() {
      var faker = new Faker('en');
      expect(faker.transform('###', [ 'numberify' ])).to.match(/^\d{3}$/);
      expect(faker.transform('tom yam', [ 'slugify' ])).to.equal('tom_yam');
    });
  });

  describe('interpolate transform', function() {
    var faker = new Faker('he');
    faker.load('he', {
      name: [
        { he: 'טום', en: 'Tom' }
      ],
      usernameHe: [
        "{{ name({ v: 'he' }) }}"
      ],
      usernameEn: [
        "{{ name({ v: 'en' }) }}"
      ],
      username: [
        "{{ name({ v: 'he' }) }}"
      ]
    });

    expect(faker.eval('username')).to.equal('טום');
    expect(faker.eval('usernameHe')).to.equal('טום');
    expect(faker.eval('usernameEn')).to.equal('Tom');

  });


  describe('.eval', function() {

    describe('when transform is a string', function() {
      it('should pass value through it', function() {
        var faker = new Faker('en');
        faker.load('en', {
          transformStr: {
            transform: 'numberify',
            options: [ "###" ]
          }
        });

        expect(faker.eval('transformStr')).to.match(/^\d{3}$/);
        expect(faker.eval('transformStr')).to.match(/^\d{3}$/);
        expect(faker.eval('transformStr')).to.match(/^\d{3}$/);
      });
    });

    describe('when transform is an array', function() {
      it('should pass value through them ', function() {
        var faker = new Faker('en');faker.load('en', {
          transformArr1: {
            transforms: [ 'numberify' ],
            options: [ "#####" ]
          },
          transformArr2: {
            transforms: [ 'interpolate', 'numberify' ],
            options: [ "{{ transformArr1 }} {{ transformArr1 }} ##" ]
          }
        });

        expect(faker.eval('transformArr1')).to.match(/^\d{5}$/);
        expect(faker.eval('transformArr1')).to.match(/^\d{5}$/);
        expect(faker.eval('transformArr1')).to.match(/^\d{5}$/);

        expect(faker.eval('transformArr2')).to.match(/^\d{5} \d{5} \d{2}$/);
        expect(faker.eval('transformArr2')).to.match(/^\d{5} \d{5} \d{2}$/);
        expect(faker.eval('transformArr2')).to.match(/^\d{5} \d{5} \d{2}$/);
      });
    });


  });


});