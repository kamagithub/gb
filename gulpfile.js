var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	notify = require('gulp-notify'),
	bower = require('gulp-bower');

var config = {
	sassPath: './dev/sass',
	bowerDir: './bower_components'
}

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest(config.bowerDir))
});

gulp.task('fonts', function() {
	return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
		.pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function() {
	return sass(config.sassPath + '/style.scss', {
			style: 'compressed',
			loadPath: [
				'./dev/sass',
				config.bowerDir + '/bootstrap-sass/assets/stylesheets',
				config.bowerDir + '/font-awesome/scss',
			]
		})
		.on("error", notify.onError(function(error) {
			return "Error: " + error.message;
		}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
				gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'fonts', 'css']);
