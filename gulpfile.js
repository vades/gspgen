'use strict';

// npm init to create package.json file
// don't forget to install gulp as a dev dependency for this project, and also globally

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  del = require('del'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  fileinclude = require('gulp-file-include'),
  plumber = require('gulp-plumber');

  //sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    //.pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task("concatHome", function () {
  gulp.src(['html/main/home.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(concat("index.html"))
    .pipe(gulp.dest("public"))
    .pipe(livereload());
});

gulp.task("watch", function () {
  livereload.listen();
  return gulp.watch(['html/partials/*.html', 'html/main/*.html', 'sass/**/*.scss', 'img/*', 'js/*'], ['build'])

})

gulp.task('clean', function () {
  del(['public'])
});

gulp.task("build", ['sass', 'concatHome'], function () {
  return gulp.src(["css/*", "img/*", "js/*"], {
      base: './'
    })
    .pipe(gulp.dest('public'))
    .pipe(livereload());

});


gulp.task("default", ["watch"]);