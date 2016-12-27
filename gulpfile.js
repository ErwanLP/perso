var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');




const PATH_TS =  './src/scripts/**/*.ts';
const PATH_TEMPLATE =  './src/templates/**/*.html';
const PATH_STYLES =  './src/styles/**/*.less';
const PATH_ASSET =  './src/assets/**/*.*';
const STATIC_FOLDER = 'public';



gulp.task('script', function () {
    runSequence(['custom-script', 'vendor-script'],'concat-script');
});


gulp.task('custom-script', function () {
    return gulp.src(PATH_TS)
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            out: 'custom.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./temp/js'));
});

gulp.task('vendor-script', function () {
    return gulp.src(
        [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/angular/angular.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./temp/js'));
});

gulp.task('concat-script', function () {
    return gulp.src(
        [
            './temp/js/vendor.js',
            './temp/js/custom.js'
        ])
        .pipe(sourcemaps.init({'loadMaps': true}))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(STATIC_FOLDER + '/js'));
});

gulp.task('html', function () {
    return gulp.src(PATH_TEMPLATE)
        .pipe(gulp.dest(STATIC_FOLDER + '/templates'));
});

gulp.task('style', function () {
    runSequence(['vendor-style', 'custom-style'], 'concat-css');
});

gulp.task('custom-style', function () {
    return gulp.src(PATH_STYLES)
        .pipe(less({}))
        .pipe(gulp.dest('./temp/css'));
});

gulp.task('vendor-style', function () {
    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ])
        .pipe(concatCss("vendor.css"))
        .pipe(gulp.dest('./temp/css'));
});

gulp.task('concat-css', function () {
    return gulp.src([
        './temp/css/style.css',
        './temp/css/vendor.css'

    ])
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest(STATIC_FOLDER + '/css'));
});

gulp.task('assets', function () {
    return gulp.src(
        PATH_ASSET
    )
        .pipe(gulp.dest(STATIC_FOLDER));
});


gulp.task('default', ['script', 'style', 'html', 'assets']);
