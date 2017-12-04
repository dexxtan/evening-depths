module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['dist/']
      }
    },
    copy: {
      main: {
        src: 'index.html',
        dest: 'dist/'
      },
      scripts: {
        src: 'scripts/**',
        dest: 'dist/'
      },
      lib: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: 'angular.min.js',
        dest: 'dist/scripts/',
        flatten: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean', 'copy']);

};
