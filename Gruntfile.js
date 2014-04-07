module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                // the files to concatenate
                src: ['public/js/page/*.js', 'public/js/page/codebinding/codebinding.js'],
                // the location of the resulting JS file
                dest: 'public/js/build/page.raw.js'
            },
            css: {
                // the files to concatenate
                src: ['public/css/theme/variables.less', 'public/css/main/initial/*.css', 'public/css/main/common.less'],
                // the location of the resulting JS file
                dest: 'public/css/build/page.raw.less'
            },
            iecss: {
                // the files to concatenate
                src: ['public/css/theme/variables.less', 'public/css/ie/common_ie.less'],
                // the location of the resulting JS file
                dest: 'public/css/build/page_ie.raw.less'
            },
            ie6css: {
                // the files to concatenate
                src: ['public/css/theme/variables.less', 'public/css/ie6/common_ie6.less'],
                // the location of the resulting JS file
                dest: 'public/css/build/page_ie6.raw.less'
            }
        },

        less: {
            options: {
                yuicompress: true,
                cleancss: true
            },
            css: {
                files: {"public/css/build/page.min.css": "public/css/build/page.raw.less" }
            },
            iecss: {
                files: {"public/css/build/page_ie.min.css": "public/css/build/page_ie.raw.less" }
            },
            ie6css: {
                files: {"public/css/build/page_ie6.min.css": "public/css/build/page_ie6.raw.less" }
            }
        },

//        cssmin: {
//            css: {
//                src: 'public/css/build/page.raw.css',
//                dest: 'public/css/build/page.min.css'
//            },
//            iecss: {
//               src: 'public/css/build/page_ie.raw.css',
//                dest: 'public/css/build/page_ie.min.css'
//            },
//            ie6css: {
//                src: 'public/css/build/page_ie6.raw.css',
//                dest: 'public/css/build/page_ie6.min.css'
//            }
//        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                src: 'public/js/build/page.raw.js',
                dest: 'public/js/build/page.min.js'
            }
        },

        jshint: {
            // define the files to lint
            files: ['<%= concat.js.src %>']
        },

        clean: {
            css: {
                src: ["public/css/build/page.raw.less", "public/css/build/page.raw.css"]
            },
            iecss: {
                src: ["public/css/build/page_ie.raw.less", "public/css/build/page_ie.raw.css"]
            },
            ie6css: {
                src: ["public/css/build/page_ie6.raw.less", "public/css/build/page_ie6.raw.css"]
            },
            cleanlesscss: {
                src: ["public/css/theme/*.css", "public/css/main/*.css", "public/css/ie/*.css", "public/css/ie6/*.css"]
            }
        },

        watch: {
            options: {
                debounceDelay: 250,
                spawn: false
            },
            js: {
                files: ['<%= concat.js.src %>'],
                tasks: ['jshint', 'concat:js', 'uglify:js']
            },
            css: {
                files: ['<%= concat.css.src %>'],
                tasks: ['concat:css', 'less:css', 'clean:css']
            },
            iecss: {
                files: ['<%= concat.iecss.src %>'],
                tasks: ['concat:iecss', 'less:iecss', 'clean:iecss']
            },
            ie6css: {
                files: ['<%= concat.ie6css.src %>'],
                tasks: ['concat:ie6css', 'less:ie6css', 'clean:ie6css']
            }
        }
    });

//    grunt.event.on('watch', function(action, filepath, target) {
//        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
//    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('optresc', ['jshint', 'concat', 'less', 'uglify', 'clean']);

    grunt.registerTask('rescwatch', ['watch']);

};