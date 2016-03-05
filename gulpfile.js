"use strict";

var gulp = require('gulp'),
  	gutil = require('gulp-util'),
  	plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    sh = require('shelljs'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    pkg = require('./package.json')
;

gulp.task('default', ['lint', 'build']);

var onError = function(error){
  	gutil.beep();
  	console.log(error);
};

gulp.task('build', function(){
    gulp.src([
        'src/f.js', 
        'src/ext.util.js',
        'src/dispatcher.js',
        'src/injector.js',
        'src/core.js',
        'src/sandbox.js',
        'src/store.js',
        'src/extension.js',
        'src/module.js',
        'src/router.js',
        'src/ext.http.js',
        'src/ext.dom.js',
        'src/ext.storage.js',
    ])
    .pipe(concat('f.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-min', function(){
    gulp.src([
        'src/f.js', 
        'src/ext.util.js',
        'src/core.js',
        'src/dispatcher.js',
        'src/sandbox.js',
        'src/store.js',
        'src/module.js',
        'src/router.js',
        'src/ext.http.js',
        'src/ext.dom.js',
        'src/ext.storage.js',
    ])
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(concat('f.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.*', ['default']);
});

gulp.task('lint', function(){
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});