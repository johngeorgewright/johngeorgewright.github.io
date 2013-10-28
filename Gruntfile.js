/*global module:false, require:false, process:false */

var marked = require('marked'),
    hljs   = require('highlight.js');

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlight(lang, code).value;
  }
});

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    // concat: {
    //   options: {
    //     banner: '<%= banner %>',
    //     stripBanners: true
    //   },
    //   dist: {
    //     src: ['lib/<%= pkg.name %>.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    connect: {
      dev: {
        options: {
          base: 'build',
          debug: true,
          keepalive: true,
          port: process.env.PORT || 5000,
          livereloadPort: 35729,
          middleware: function (connect, options) {
            var livereload = require('connect-livereload')({
                  port: options.livereloadPort
                });
            return [
              livereload,
              connect.static(options.base)
            ];
          }
        }
      }
    },
    copy: {
      semanticUI: {
        files: [{
          expand: true,
          cwd: 'vendor/semantic-ui/build/packaged',
          src: '**',
          dest: 'build/vendor/semantic-ui'
        }]
      }
    },
    // uglify: {
    //   options: {
    //     banner: '<%= banner %>'
    //   },
    //   dist: {
    //     src: '<%= concat.dist.dest %>',
    //     dest: 'dist/<%= pkg.name %>.min.js'
    //   }
    // },
    jade: {
      dist: {
        options: {
          pretty: false
        },
        files: [{
          expand: true,
          cwd: 'source/jade',
          src: '**/*.jade',
          dest: 'build',
          ext: '.html'
        }]
      },
      dev: {
        options: {
          pretty: true
        },
        files: '<%= jade.dist.files %>'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    less: {
      dist: {
        options: {
          compress: true
        },
        files: {
          "build/css/main.css": "source/less/**/*.less"
        }
      },
      dev: {
        options: {
          compress: false,
          dumpLineNumbers: true
        },
        files: '<%= less.dist.files %>'
      }
    },
    watch: {
      options: {
        atBegin: true,
        livereload: '<%= connect.dev.options.livereloadPort %>'
      },
      less: {
        files: 'source/less/**/*.less',
        tasks: ['less:dev']
      },
      templates: {
        files: 'source/jade/**/*.jade',
        tasks: ['jade:dev']
      },
      jshint: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint']
      }
    }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jade:dist', 'copy:semanticUI', 'less:dist']);

};

