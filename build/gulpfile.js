'use strict';

// load Gulp dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const combineMq = require('gulp-combine-mq');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');



// compile SASS
gulp.task('styles', () => {
 return gulp.src('sass/compile.scss')
  .pipe(sourcemaps.init())

  .pipe(sass({outputStyle: 'compressed'})

	// error/alert
	.on('error', sass.logError)
  .on('error', (e) => {
		notify.onError({
			title: "Gulp",
			message: "SCSS compile error",
			sound: "Submarine"})(e);
	}))

  // browser autoprefixer
  .pipe(autoprefixer({
    browsers: ['> 5%', 'IE 10','last 2 versions'],
    cascade: false,
    remove: true
  }))

  // combine media queries and move to end of stylesheet
  .pipe(combineMq({
    beautify: false
  }))

  .pipe(rename('layout.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('../dist/css'))

  // re-inject styles into page
  .pipe(livereload());
});



// watch javascript
gulp.task('scripts', () => {
  return gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: [es2015]
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../dist/js'))
    .pipe(livereload());
});



// watch files for changes
gulp.task('watch', () => {
	livereload.listen();

  //watch and reload PHP and html
  gulp.watch('../**/*.php').on('change', function(file) {
  	livereload.changed(file.path);
  });

  gulp.watch('../**/*.html').on('change', function(file) {
  	livereload.changed(file.path);
 	});

  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('sass/**/*.scss', ['styles']);
});



// Ready? Set... Go!
gulp.task('default', ['styles', 'scripts', 'watch']);
