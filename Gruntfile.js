module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		txt: {
			copyYear: grunt.template.today( "UTC:yyyy" ),
			banner : {
				long: [
					"/*",
					" * jQuery-Mobile-Windows <%= version %>",
					" * Date: " + grunt.template.today( "UTC:ddd mmm d yyyy HH:MM:ss Z" ),
					" * http://dev.jtsage.com/jQM-Windows/",
					" * https://github.com/jtsage/jquery-mobile-windows",
					" *",
					" * Copyright 2010, <%= txt.copyYear %> JTSage. and other contributors",
					" * Released under the MIT license.",
					" * https://github.com/jtsage/jquery-mobile-windows/blob/master/LICENSE.txt",
					" *",
					" */",
					"" ].join( grunt.util.linefeed ),
				short: "/*! jQuery-Mobile-Windows <%= version %> |" + 
					grunt.template.today( "UTC:yyyy-mm-dd" ) + "T" + 
					grunt.template.today( "UTC:HH:MM:ss" ) +
					"Z | (c) 2010,  <%= txt.copyYear %> JTSage | " +
					"https://github.com/jtsage/jquery-mobile-windows/blob/master/LICENSE.txt */\n"
			}
		},
		jshint: {
			js: {
				files: {
					src: [ "js/*.js" ]
				},
				options: {
					jshintrc: "js/.jshintrc"
				}
			},
			grunt: {
				files: {
					src: [ "Gruntfile.js", "build/tasks/*.js" ]
				},
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
	});
	
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	//grunt.loadNpmTasks( "grunt-contrib-concat" );
	//grunt.loadNpmTasks( "grunt-contrib-clean" );
	
	//grunt.loadNpmTasks( "grunt-contrib-uglify" );
	
	//grunt.loadNpmTasks( "grunt-git-committers" );
	//grunt.loadNpmTasks( "grunt-jekyll" );
	//grunt.loadNpmTasks( "grunt-contrib-watch" );
	//grunt.loadNpmTasks( "grunt-prettify" );
	//grunt.loadNpmTasks( "grunt-html" );
	
	/*grunt.registerTask( "release", "Build a release version of DateBox", [
		"jshint_sane",
		"qunit",
		"clean:release",
		"concat:ver_main",
		"concat:ver_extra",
		"concat:ver_comp_datebox",
		"concat:ver_comp_calbox",
		"concat:ver_comp_flipbox",
		"concat:ver_comp_slidebox",
		"concat:ver_comp_customflip",
		"copy:release",
		"copy:release_css",
		"uglify:release",
		"cssmin:release",
		"committers",
		"copy:backreq",
		"jekyll:release",
		"prettify",
	] );
	
	grunt.registerTask( "latest", "Build a working version of DateBox (no testing)", [
		"clean:latest",
		"concat:lat_main",
		"concat:lat_amd",
		"copy:latest",
		"copy:latest_css",
		"uglify:latest",
		"cssmin:latest",
	]);*/
	

	grunt.registerTask( "web", "Build the documentation site", ["jekyll:release", "prettify"] );
	grunt.registerTask( "devweb", "Test the documentation site", ["jekyll:latest", "prettify"] );
	grunt.registerTask( "test", "Test the DateBox Suite", ["jshint"] );

	grunt.registerTask( "default", "Test and Build working version", [
		"jshint",
	] );
}
