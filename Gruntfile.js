module.exports = function (grunt) {
  grunt.initConfig({
    pkg : grunt.file.readJSON("package.json"),
    concat: {
      build: {
        src: ['src/assets/js/videoData.js',
              'src/assets/js/videoController.js',
              'src/assets/js/navigationController.js',
              'src/assets/js/introController.js',
              'src/assets/js/resizeController.js',
              'src/assets/js/main.js'],
        dest: 'build/assets/js/main.js'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'src/', src: ['assets/images/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['assets/css/main.css'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['assets/fonts/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['assets/libs/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['index.html'], dest: 'build/'}
        ]
      }
    },
    uglify: {
      options: {
        banner: '/* AMBION Weihnachtsmailing 2020 */\n',

      },
      build: {
        files: {
          'build/assets/js/main.min.js': ['build/assets/js/main.js']
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/assets/css/main.min.css': ['src/assets/css/main.css']
        }
      }
    },
    jsdoc : {
      build: {
        src: ['src/assets/js/*.js'],
        options: {
          destination: 'build/doc'
        }
      }
    },
    processhtml: {
      options: {
        data: {
          message: 'Hello world!'
        }
      },
      build: {
        files: {
          'build/index.html': ['src/index.html']
        }
      }
    },
    clean: {
      after: ['build/assets/js/main.js', 'build/assets/css/main.css'],
      before: ['build'],
    },
    jshint: {
      all: ['src/assets/js/*.js'],
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'src/assets/css/main.css': 'src/assets/css/scss/main.scss'
        }
      }
    },
    watch: {
      index: {
        files: ['src/index.html'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/assets/js/*.js', 'src/assets/js/**/*.js'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      css: {
        files: 'src/assets/css/*.css',
        tasks: [],
        options: {
          livereload: true
        }
      },
      scss: {
        files: ['src/assets/css/scss/*.scss','src/assets/css/scss/partials/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
          spawn: false

        }
      },
      jsh: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8888,
          open: true,
          livereload: 35729,
          hostname: 'localhost',
          base: 'src'
        }
      }
    },
    options: {
      interrupt: true,
      debounceDelay: 250,
      reload: true,
      livereload: true
    }
  });

  grunt.loadNpmTasks('grunt-open');

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('dev', ['jshint:all', 'connect', 'watch']);
  grunt.registerTask('build', ['clean:before', 'concat:build', 'copy:main', 'jsdoc', 'uglify:build', 'cssmin', 'clean:after', 'processhtml']);
};
