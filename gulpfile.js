'use strict';

const del = require('del');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');

const config = {
  path: __dirname + '/src',
  main: 'app.ts',
  result: 'background.js'
};

gulp.task('clean', () => {
  return del('./dist/**/*');
});

gulp.task('copy:chrome', () => {
  return gulp.src('src/chrome/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
  const bundler = browserify({basedir: config.path})
    .add(config.path + '/' + config.main)
    .plugin(tsify);

  return bundler.bundle()
    .pipe(source(config.result))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['clean', 'copy:chrome', 'build']);
