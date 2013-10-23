/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    connect: {
      dev: {
        options: {
          base: 'build',
          debug: true,
          keepalive: true,
          port: process.env.PORT || 5000,
          middleware: function (connect, options) {
            return [connect.static(options.base)];
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect:dev']);

};

