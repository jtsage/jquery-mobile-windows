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
		clean: {
			latest: ["dist/latest/"],
			release: ["dist/<%= pkg.version %>/"],
		},
		concat: {
			options: {
				stripBanners: true,
				banner: "<%= txt.banner.long %>",
			},
			lat_alert: {
				src: [
					"build/wrap.begin",
					"js/jqm-windows.alertbox.js",
					"build/wrap.end",
				],
				dest: "dist/latest/jqm-windows.alertbox.js"
			},
			lat_mdialog: {
				src: [
					"build/wrap.begin",
					"js/jqm-windows.mdialog.js",
					"build/wrap.end",
				],
				dest: "dist/latest/jqm-windows.mdialog.js"
			},
			ver_alert: {
				src: [
					"build/wrap.begin",
					"js/jqm-windows.alertbox.js",
					"build/wrap.end",
				],
				dest: "dist/<%= pkg.version %>/jqm-windows-<%= pkg.version %>.alertbox.js"
			},
			ver_mdialog: {
				src: [
					"build/wrap.begin",
					"js/jqm-windows.mdialog.js",
					"build/wrap.end",
				],
				dest: "dist/<%= pkg.version %>/jqm-windows-<%= pkg.version %>.mdialog.js"
			},
		},
		uglify: {
			options: {
				banner: "<%= txt.banner.short %>",
				verbose: true
			},
			release: {
				files: [ {
					expand: true,
					src: ["dist/<%= pkg.version %>/*.js"],
					dest: "",
					ext: ".min.js",
					extDot: "last" 
				} ]
			},
			latest: {
				files: [ {
					expand: true,
					src: ["dist/latest/*.js"],
					dest: "",
					ext: ".min.js",
					extDot: "last" 
				} ]
			}
		},
		committers: {
			options: {
				sort: "commits",
				email: true,
				nomerges: true,
			}
		},
		jekyll: {
			options: {
				src : "docs/",
				dest: "docs/_site"
			},
			release: {
				options: {
					config: "docs/_config.yml"
				}
			}
		},
		prettify: {
			options: {
				// Task-specific options go here.
			},
			all: {
				expand: true,
				cwd: "docs/_site/",
				ext: ".html",
				src: ["**/*.html"],
				dest: "docs/_site/"
			},
		},
		htmllint: {
			all: ["docs/_site/**/*.html"]
		}
	});
	
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-git-committers" );
	grunt.loadNpmTasks( "grunt-jekyll" );
	grunt.loadNpmTasks( "grunt-prettify" );
	grunt.loadNpmTasks( "grunt-html" );
	
	grunt.registerTask( "release", "Build a release version of jQM-Windows", [
		"jshint",
		"clean:release",
		"concat:ver_alert",
		"concat:ver_mdialog",
		"uglify:release",
		"committers",
		"jekyll:release",
		"prettify",
	] );
	
	grunt.registerTask( "latest", "Build a working version of jQM-Windows (no testing)", [
		"clean:latest",
		"concat:lat_alert",
		"concat:lat_mdialog",
		"uglify:latest",
	]);
	

	grunt.registerTask( "web", "Build the documentation site", ["jekyll:release", "prettify"] );
	grunt.registerTask( "test", "Test the jQM-Windows Suite", ["jshint"] );

	grunt.registerTask( "default", "Test and Build working version", [
		"jshint",
		"latest",
	] );
};
