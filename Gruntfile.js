module.exports = function (grunt) {
  /*eslint camelcase: 0*/
  'use strict';

  var commonJSfiles = [
    'node_modules/jquery/dist/jquery.js',
    'bower_components/jquery-guillotine/js/jquery.guillotine.js',
    'bower_components/select2/dist/js/select2.js',
    'bower_components/autoNumeric/autoNumeric.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/bootstrap-datepicker/js/bootstrap-datepicker.js',
    'node_modules/bootstrap-markdown/js/bootstrap-markdown.js',
    'node_modules/bootstrap-markdown/locale/bootstrap-markdown.de.js',
    'node_modules/moment-timezone/node_modules/moment/moment.js',
    'bower_components/smartmenus/dist/jquery.smartmenus.js',
    'softwerkskammer/build/javascript/jquery.smartmenus.bootstrap-patched.js',
    'softwerkskammer/build/javascript/fullcalendar-patched.js',
    'node_modules/tinycolor2/tinycolor.js',
    'node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
    'bower_components/jquery-validation/dist/jquery.validate.js',
    'bower_components/jquery-validation/dist/additional-methods.js',
    'bower_components/jquery.qrcode/dist/jquery.qrcode.js',
    'bower_components/bootstrap-timepicker/js/bootstrap-timepicker.js',
    'bower_components/jqcloud2/dist/jqcloud.js',
    'node_modules/tinygradient/tinygradient.js',
    'node_modules/URIjs/src/URI.js'
  ];

  // filesets for uglify
  var files_de = {
    'softwerkskammer/public/clientscripts/global_de.js': commonJSfiles.concat([
      'bower_components/jquery-validation/src/localization/messages_de.js',
      'bower_components/jquery-validation/src/localization/methods_de.js',
      'node_modules/bootstrap-datepicker/js/locales/bootstrap-datepicker.de.js',
      'bower_components/select2/select2_locale_de.js',
      'node_modules/fullcalendar/dist/lang/de.js',
      'softwerkskammer/locales/frontend_de.js',
      'softwerkskammer/frontend/javascript/agora.js'
    ])
  };

  var files_en = {
    'softwerkskammer/public/clientscripts/global_en.js': commonJSfiles.concat([
      'node_modules/fullcalendar/dist/lang/en-gb.js',
      'softwerkskammer/locales/frontend_en.js',
      'softwerkskammer/frontend/javascript/agora.js'
    ])
  };

  grunt.initConfig({
    clean: {
      bower_components: ['bower_components'],
      build: ['softwerkskammer/build', 'softwerkskammer/frontendtests/fixtures/*.html'],
      coverage: ['softwerkskammer/coverage', 'softwerkskammer/coverageWithDB', 'softwerkskammer/karma-coverage'],
      public: ['softwerkskammer/public/clientscripts', 'softwerkskammer/public/fonts', 'softwerkskammer/public/img/bootstrap-colorpicker', 'softwerkskammer/public/images', 'softwerkskammer/public/stylesheets'],
      options: {force: true}
    },
    copy: {
      datatablesJS: {
        src: 'node_modules/datatables/media/js/*.min.js',
        dest: 'softwerkskammer/public/clientscripts',
        expand: true,
        flatten: true
      },
      datatablesBootstrapAndGermanJS: {
        src: 'softwerkskammer/frontend/3rd_party_js/dataTables*',
        dest: 'softwerkskammer/public/clientscripts',
        expand: true,
        flatten: true
      },
      datatablesImages: {
        src: 'node_modules/datatables/media/images/*',
        dest: 'softwerkskammer/public/images/',
        expand: true,
        flatten: true
      },
      colorpickerImages: {
        cwd: 'node_modules/bootstrap-colorpicker/dist/img',
        src: ['**'],
        dest: 'softwerkskammer/public/img/',
        expand: true,
        flatten: false
      },
      bootstrapFONTS: {
        src: 'node_modules/bootstrap/dist/fonts/*',
        dest: 'softwerkskammer/public/fonts',
        expand: true,
        flatten: true
      },
      bootstrapLESS: {
        cwd: 'node_modules/bootstrap/less/',
        src: ['**', '!variables.less'],
        dest: 'softwerkskammer/build/stylesheets/less',
        expand: true,
        flatten: false
      },
      bootstrapMarkdownLESS: {
        src: 'node_modules/bootstrap-markdown/less/*',
        dest: 'softwerkskammer/build/stylesheets/less',
        expand: true,
        flatten: true
      },
      fontawesomeFONTS: {
        src: 'node_modules/font-awesome/fonts/*',
        dest: 'softwerkskammer/public/fonts',
        expand: true,
        flatten: true
      },
      customJS: {
        cwd: 'softwerkskammer/frontend/javascript/',
        src: ['*', '!agora.js'],
        dest: 'softwerkskammer/public/clientscripts',
        expand: true,
        flatten: false
      },
      customLESS: {
        src: 'softwerkskammer/frontend/less/*',
        dest: 'softwerkskammer/build/stylesheets/less',
        expand: true,
        flatten: true
      },
      select2images: {
        cwd: 'bower_components/select2/',
        src: ['*.png', '*.gif'],
        dest: 'softwerkskammer/public/stylesheets',
        expand: true,
        flatten: false
      }
    },
    patch: {
      smartmenus: {
        options: {
          patch: 'softwerkskammer/frontend/3rd_party_js/jquery.smartmenus.bootstrap.js.patch'
        },
        files: {
          'softwerkskammer/build/javascript/jquery.smartmenus.bootstrap-patched.js': 'bower_components/smartmenus/dist/addons/bootstrap/jquery.smartmenus.bootstrap.js'
        }
      },
      fullcalendar: {
        options: {
          patch: 'softwerkskammer/frontend/3rd_party_js/fullcalendar.js.patch'
        },
        files: {
          'softwerkskammer/build/javascript/fullcalendar-patched.js': 'node_modules/fullcalendar/dist/fullcalendar.js'
        }
      }
    },
    eslint: {
      options: {quiet: true},
      target: ['softwerkskammer/**/*.js']
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      once: {
        browsers: ['PhantomJS'],
        runnerPort: 6666,
        singleRun: true
      }
    },
    less: {
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'softwerkskammer/public/stylesheets/screen.css': [
            'node_modules/fullcalendar/dist/fullcalendar.css',
            'softwerkskammer/build/stylesheets/less/bootstrap.less',
            'node_modules/bootstrap-datepicker/css/datepicker3.css',
            'softwerkskammer/build/stylesheets/less/bootstrap-markdown-patched.less',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/node-syntaxhighlighter/lib/styles/shCoreDefault.css',
            'bower_components/smartmenus/dist/addons/bootstrap/jquery.smartmenus.bootstrap.css',
            'node_modules/datatables/media/css/jquery.dataTables.css',
            'softwerkskammer/frontend/3rd_party_css/dataTables.bootstrap.css',
            'softwerkskammer/frontend/3rd_party_css/dataTables.fontAwesome.css',
            'bower_components/select2/dist/css/select2.css',
            'node_modules/select2-bootstrap-css/select2-bootstrap.css',
            'node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css',
            'bower_components/jquery-guillotine/css/jquery.guillotine.css',
            'softwerkskammer/build/stylesheets/less/agora.less'
          ]
        }
      }
    },
    uglify: {
      development_de: {
        options: {
          mangle: false,
          beautify: true
        },
        files: files_de
      },
      development_en: {
        options: {beautify: true},
        files: files_en
      },
      production_de: {
        files: files_de
      },
      production_en: {
        files: files_en
      }
    },

    mocha_istanbul: {
      testWithDB: {
        src: 'softwerkskammer/testWithDB',
        options: {
          coverageFolder: 'softwerkskammer/coverageWithDB',
          excludes: ['**/activitystore.js'],
          timeout: 6000,
          slow: 100,
          mask: '**/*.js',
          root: 'softwerkskammer/lib',
          reporter: 'dot'
        }
      },
      test: {
        src: 'softwerkskammer/test',
        options: {
          coverageFolder: 'softwerkskammer/coverage',
          timeout: 6000,
          slow: 100,
          mask: '**/*.js',
          root: 'softwerkskammer/lib',
          reporter: 'dot',
          check: {
            lines: 80,
            statements: 76
          }
        }
      }
    },
    istanbul_check_coverage: {
      server: {
        options: {
          coverageFolder: 'softwerkskammer/coverage*',
          check: {
            lines: 81,
            statements: 77
          }
        }
      },
      frontend: {
        options: {
          coverageFolder: 'softwerkskammer/karma-coverage',
          check: {
            lines: 93,
            statements: 93
          }
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: function () {
            return require('./softwerkskammer/frontendtests/fixtures/locals');
          }
        },
        files: {
          'softwerkskammer/frontendtests/fixtures/forms.html': 'softwerkskammer/frontendtests/fixtures/forms.jade'
        }
      }
    },
    'bower-install-simple': {
      default: {
        options: {
          directory: 'bower_components'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-bower-install-simple');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-patch');

  grunt.registerTask('prepare', ['bower-install-simple', 'copy', 'patch', 'less']);
  grunt.registerTask('frontendtests', ['clean', 'prepare', 'jade', 'uglify:production_de', 'karma:once', 'uglify:development_de', 'karma:once', 'istanbul_check_coverage:frontend']);
  grunt.registerTask('tests', ['eslint', 'frontendtests', 'mocha_istanbul', 'istanbul_check_coverage:server']);
  grunt.registerTask('deploy_development', ['prepare', 'uglify:development_de', 'uglify:development_en']);

  // Default task.
  grunt.registerTask('default', ['tests', 'uglify:development_en']);

  grunt.registerTask('deploy_production', ['clean', 'prepare', 'uglify:production_de', 'uglify:production_en']);
};
