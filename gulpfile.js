var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    port = 8080;

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe($.connect.reload())
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish));
});

gulp.task('css', function() {
    gulp.src('./css/*.css')
        .pipe($.connect.reload())
        .pipe($.csslint())
        .pipe($.csslint.reporter());
});

gulp.task('scss', function() {
    gulp.src('./scss/*.scss')
        .pipe($.rubySass())
        .pipe(gulp.dest('css'));
});

gulp.task('connect', function() {
    $.connect.server({
        root: '.',
        port: port,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe($.connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./js/*.js'], ['js']);
    gulp.watch(['./css/*.css'], ['css']);
    gulp.watch(['./scss/*.scss'], ['scss']);
});

gulp.task('default', ['connect', 'watch']);