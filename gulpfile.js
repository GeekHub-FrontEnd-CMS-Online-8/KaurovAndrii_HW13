const gulp = require('gulp');
const htmlminify = require('gulp-html-minify');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const minifyjs = require('gulp-js-minify')
const imagemin = require('gulp-tinypng');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	})
})

gulp.task('htmlminify', function () {
	return gulp.src('src/*.html')
	.pipe(htmlminify())
	.pipe(gulp.dest('build'))
	.on('end', browserSync.reload)
});

gulp.task('csso', function () {
	return gulp.src('src/css/*.css')
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(csso())
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('scripts', function () {
	return gulp.src('src/js/*.js')
	.pipe(minifyjs())
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({
		stream: true
	}))
})

gulp.task('php', function () {
	return gulp.src('src/*.php')
	.pipe(gulp.dest('build'))
	.on('end', browserSync.reload)
});

gulp.task('tinypng', function () {
    return gulp.src('src/img/*.{png,svg,jpg,gif}')
    .pipe(imagemin('3s6f10xSKddgT1y8Q32ZsT1N8TBd69pB'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.html', gulp.series('htmlminify'))
	gulp.watch('src/css/**/*.css', gulp.series('csso'))
	gulp.watch('src/js/**/*.js', gulp.series('scripts'))
	gulp.watch('src/**/*.php', gulp.series('php'))
	gulp.watch('src/img/**/*.png', gulp.series('tinypng'))
})

gulp.task('default', gulp.series (
	gulp.parallel('htmlminify', 'csso', 'scripts', 'php', 'tinypng'),
	gulp.parallel('watch', 'browser-sync')
	))