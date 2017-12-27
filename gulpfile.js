const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile sass  inject into browser
gulp.task('sass', function () {
	return gulp.src(['./node_modules/bootstrap/scss/bootstrap.scss', './src/scss/*.scss'])
	.pipe(sass()) //send this through sass() fn
	.pipe(gulp.dest('./src/css')) //save css files after compilation dir
	.pipe(browserSync.stream());
});

//Move JS files
gulp.task('js', function () {
	return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js', './node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest('./src/js'))
	.pipe(browserSync.stream());
});

//Watch sass  serve
gulp.task('serve', ['sass'], function () {
	browserSync.init({ //init browserSync with src folder, so bsync load content of src folder
		server: './src'
	});
	//watch commands to detect sass changes
	gulp.watch(['./node_modules/bootstrap/scss/bootstrap.scss', './src/scss/*.scss'], ['sass']);
	//watch html to detect changes & reload
	gulp.watch('./src/*.html').on('change', browserSync.reload);
});

//Move fonts 
gulp.task('fonts', function () {
	gulp.src(['./node_modules/font-awesome/fonts/*'])
	.pipe(gulp.dest('./src/fonts'));
});

//Move font-awesome css
gulp.task('font-awesome-css', function () {
	gulp.src(['./node_modules/font-awesome/css/font-awesome.min.css'])
	.pipe(gulp.dest('./src/css'));
});

//gulp default task - runs when entered gulp
gulp.task('default', ['js', 'fonts', 'font-awesome-css', 'serve']);