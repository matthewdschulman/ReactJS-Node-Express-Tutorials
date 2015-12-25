module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'watch']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
				options: {
      		browserifyOptions: {
        		debug: true
      		}
    		},
        src: 'js/main.js',
        dest: 'js/compilation.js'
      }
    },
    watch: {
      files: 'js/*',
      tasks: ['default']
    }
  });
}
