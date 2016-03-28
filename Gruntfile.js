"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'dist/css/main.css': 'themes/DemoApp/scss/main.scss'
                }
            }
        },
        jshint: {
            all: {
                src: ['app/*.js', 'app/**/*.js'],
                options: {
                    jshintrc: true
                }
            },
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ 'app/*.js', 'tmp/*.js' ],
                dest: 'dist/js/app.min.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/app.min.js': [ 'dist/js/app.min.js' ]
                },
                options: {
                    mangle: false
                }
            }
        },
        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        },
        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
                tasks: [ 'jshint', 'concat:dist', 'clean:temp' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
                tasks: [ 'sass', 'jshint', 'concat:dist', 'clean:temp', 'uglify:dist' ],
                options: {
                    atBegin: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', [ 'sass', 'jshint', 'concat:dist', 'uglify:dist', 'clean:temp', 'connect:server', 'watch:min' ]);
};