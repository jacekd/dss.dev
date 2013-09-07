module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/* <%= pkg.title %> - v<%= pkg.version %> - ' + 
              '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '<%= pkg.homepage %>\n' +
              '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
              ' Licence <%= pkg.licence %> */'
    },
    watch: {
      options: {
        livereload: true,
      }
    }
  });
  // Loading of the tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-phplint')

  // Default task
  grunt.registerTask('default', 'watch');
}
