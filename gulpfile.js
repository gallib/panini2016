var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var rimraf      = require('rimraf');
var browserSync = require('browser-sync').create();
var sequence    = require('gulp-sequence');
var concat      = require('gulp-concat');
var modRewrite  = require('connect-modrewrite');

require('es6-promise').polyfill();

var paths = {
    assets: [
        './client/**/*.*',
        '!./client/assets/{scss,js}/**/*.*'
    ],
    sass: [
        'bower_components/foundation-sites/scss',
        'bower_components/motion-ui/src'
    ],
    'foundationJS': [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/what-input/what-input.js',
        'bower_components/foundation-sites/dist/foundation.js'
    ],
    'appJS': [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-resource/angular-resource.js',
        'client/assets/js/services.js',
        'client/assets/js/controllers.js',
        'client/assets/js/directives.js',
        'client/assets/js/app.js'
    ]
}

// Cleans the build directory
gulp.task('clean', function(cb) {
    rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
    return gulp
        .src(paths.assets, {
            base: './client/'
        })
        .pipe(gulp.dest('./build'));
});

// Compiles Sass
gulp.task('sass', function() {
    return gulp
        .src('./client/assets/scss/app.scss')
        .pipe($.sass({
            includePaths: paths.sass
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('concat', ['concat:foundation', 'concat:app']);

gulp.task('concat:foundation', function(cb) {
    return gulp
        .src(paths.foundationJS)
        .pipe(concat('foundation.js'))
        .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('concat:app', function() {
    return gulp
        .src(paths.appJS)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./build/assets/js/'));
});

// Starts the server
gulp.task('server', ['build'], function() {
    browserSync.init({
        server: "./build",
        middleware: [
              modRewrite(['^([^.]+)$ /index.html [L]'])
          ]
    });
});

// Builds the app
gulp.task('build', function(cb) {
    sequence('clean', ['copy', 'sass', 'concat'], cb);
});

// Default tasks
gulp.task('default', ['server'], function () {
    // Watch Sass
    gulp.watch(['./client/assets/scss/**/*.*'], ['sass']);

    // Watch Javascript
    gulp
        .watch('./client/assets/js/**/*', ['concat'])
        .on('change', browserSync.reload);

    // Watch Static files
    gulp
        .watch(['./client/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy'])
        .on('change', browserSync.reload);
});