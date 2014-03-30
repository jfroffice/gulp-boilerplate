var gulp = require("gulp"),
	gutil = require('gulp-util'),
	jshint = require("gulp-jshint"),
	csslint = require('gulp-csslint'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	open = require("gulp-open"),
	clean = require('gulp-clean'),
	port = 80;

gulp.task('hint', function() {
	return gulp.src('js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('lint', function() {
  gulp.src('css/*.css')
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.reporter());
});

gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('css'));
});

gulp.task('connect', function(next) {
	var staticS = require('node-static'),
		srv = new staticS.Server('./');

	require('http').createServer(function (request, response) {
		request.addListener('end', function () {
			srv.serve(request, response);
		}).resume();
	}).listen(port, function() {
		gutil.log('Server listening on port: ' + gutil.colors.yellow(port));
		next();
	});
});

gulp.task("launch", function(){
	var options = {
	    url: "http://127.0.0.1:" + port,
	    app: "chrome"
	  };
  	gulp.src("./index.html")
  		.pipe(open("", options)); 
});

gulp.task('default', ['connect', 'launch'], function() {

	var server = livereload();

	gulp.watch('js/*.js', ['hint'], function(file) {
		server.changed(file.path);
	}); 
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('css/*.css').on('change', function(file) {
		gulp.run('lint');		
		server.changed(file.path);		
	});

	gulp.watch('*.html').on('change', function(file) {
		server.changed(file.path);
	});
});

/*
var	imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

gulp.task('image', function () {
    gulp.src('img/{*.png,*.jpg, *.gif}')
        .pipe(imagemin())        
        .pipe(gulp.dest('dist/img'))
        .pipe(rev());
});

gulp.task('clean', function () {
    gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('usemin', function() {
  gulp.src('./*.html')
    .pipe(usemin({}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['clean', 'usemin', 'image']);*/