module.exports = function(grunt) { 
grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json') ,
    
    watch: {
        less: {
            files: ['app/less/*.less','app/js/*.js', 'app/js/**/*.js','index.html', 'partials/*.html'],
            tasks: ['less','concat','uglify', 'cssmin', 'copy', 'karma:unit']
        }
    },
    karma: {
            options: {
                reporters: ['spec'],
                frameworks: ['jasmine'],
                browsers: ['PhantomJS'],
                singleRun: true,
                log: true,
                logLevel: 'OFF',
                client: {
                    captureConsole: false
                },
                files: [
                    'libs/angular.min.js',
                    'libs/angular-mocks.js',
                    'app/js/*.js',
                    'app/js/**/*.js',
                ]
            },
            unit: {},
    },
    clean: ['dist/'],
    copy: {
            target: {
                files: [{
                    expand: true,
                    src: ['index.html', 'robots.txt', 'images/**', 'partials/**',],
                    dest: 'dist/'
                }],
            },
    },
    less: {
        build: {
        files: {
            'dist/style/style.css': 'app/less/*.less'    
        }
    }
    },
    cssmin:{
        build:{
            src:'dist/style/style.css',
            dest:'dist/style/style.min.css'
        }
    },
    concat:{
        build:{
            src:['app/js/*.js','app/js/**/*.js', '!app/js/app.test.js', '!app/js/**/*.test.js',],
            dest:'dist/scripts/script.js'
        }
    },
    uglify:{
        build:{
            src:['dist/scripts/script.js'],
            dest:'dist/scripts/script.min.js'
        }
    },
    
});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
 grunt.loadNpmTasks("grunt-karma");
grunt.registerTask('default',  ['less', 'watch', 'concat', 'uglify', 'cssmin', 'clean', 'copy']);
}
