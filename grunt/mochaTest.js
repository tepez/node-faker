module.exports = {
  test: {
    options: {
      reporter: 'spec',
      clearRequireCache: true
    },
    src: [ '<%= files.test %>' ]
  }
};