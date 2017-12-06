'use strict';

// load Gulp dependencies
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      autoprefixer = require('gulp-autoprefixer'),
      combineMq = require('gulp-combine-mq'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      notify = require('gulp-notify'),
      plumber = require('gulp-plumber'),
      php = require('gulp-connect-php'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload;



// compile SASS
gulp.task('styles', () => {
 return gulp.src('sass/compile.scss')
  .pipe(plumber())
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

  .pipe(reload({stream:true}));
});



// compile javascript
gulp.task('scripts', () => {
  return gulp.src(['js/!(functions)*.js', 'js/functions.js'])

  	// initialize sourcemaps
    .pipe(sourcemaps.init())

    // babel/es6
    .pipe(babel({
        presets: ["env"]
    }))

    // error messages/notifications
    .on('error', console.error.bind(console))
    .on('error', (e) => {
  		notify.onError({
  			title: "Gulp",
  			message: "Javascript compile error",
  			sound: "Submarine"})(e);
  	})

  	// concatenate all js files in build/js directory
    .pipe(concat('scripts.min.js'))

    // create sourcemap and compiled js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../dist/js'))

    .pipe(reload({stream:true}));
});


// create php server with live reload (via BrowserSync)
gulp.task('php', function() {
    php.server({
      base: '../dist/',
      port: 8010,
      keepalive: true
    });
});

gulp.task('browser-sync',['php'], function() {
    browserSync.init(null,{
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});


// watch files for changes
gulp.task('watch', () => {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch(['../dist/**/*.php', '../dist/*.php'], reload);
});


// Ready? Set... Go!
gulp.task('default', ['styles', 'scripts', 'watch', 'browser-sync']);
