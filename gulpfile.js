var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var styleChecker = require('gulp-eslint-style-checker');

gulp.task('unit-test', function() {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha({
            reporter: 'spec',
            timeout: 4000
        }))
        .once('error', function(err) {
            console.log(err);
            process.exit(1);
        })
        .once('end', function() {
            process.exit();
        });
});

gulp.task('babel', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});


gulp.task('style-check', function() {
    return styleChecker(['src/**/*.js']);
});

gulp.task('test', ['unit-test', 'style-check']);
