module.exports = {

  grunt: {
    files: [ '<%= files.grunt %>' ],
    tasks: [ 'jshint:grunt' ],
    options: { reload: true }
  },

  source: {
    files: [ '<%= files.source %>' ],
    tasks: [ 'jshint:source', 'test' ]
  },

  unit: {
    files: [ '<%= files.test %>' ],
    tasks: [ 'jshint:test', 'test' ]
  }

};
