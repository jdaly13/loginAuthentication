var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
//var historyApiFallback = require('connect-history-api-fallback');

var browserifyOpts = {
  entries: ['./public/js/main.js'],
  debug: true
};



function bundle(b) {
  return b.bundle()
    .on('error', function(err) { console.error(err + ' bigHuman'); this.emit('end'); })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
}

gulp.task('watchify', () => {
  let b = watchify(browserify(browserifyOpts.entries[0], { debug: true }).transform(babel, {presets: ["es2015", "react"]}));

  b.on('update', () => {
    return bundle(b);
  });

  return bundle(b);
});

gulp.task('build', () => {
  bundle(browserify(browserifyOpts));
});

gulp.task('browserSync', ['nodemon'], () => {
  browserSync.init(null, {
    files: ['./public/*.html', './public/*.css', './public/*.js'],
    browser: ['google chrome'],
    proxy: 'http://localhost:3099',
    port: 7000,
    open: false,
    notify: false,
    logConnections: false,
    reloadDelay: 1000
  });
});

gulp.task('nodemon', function (cb) {
	var called = false;
  return nodemon({
    script: 'server.js',
		 ignore: [
      'gulpfile.js',
      'node_modules/'
    ],
  	env: { 'NODE_ENV': 'development' }
  })
	.on('start', function () {
     if (!called) {
        called = true;
        return cb();
      }
	})
	.on('restart', function () {
			browserSync.reload();
	});
});

gulp.task('es2015:watch', ['es2015'], function() {
  browserSync.reload()
})


gulp.task('sass', function() {
  return gulp.src('./public/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.watch('./public/scss/**/*.scss', ['sass']);
gulp.task('start', ['watchify', 'browserSync', 'sass']);
