module.exports = {
  options: {
    curly: true,
    immed: true,
    newcap: true,
    noarg: true,
    sub: true,
    boss: true,
    eqnull: true
  },

  source: {
    src: ['<%= files.source %>']
  },
  test: {
    src: ['<%= files.test %>']
  },
  grunt: {
    src: ['<%= files.grunt %>']
  }

};