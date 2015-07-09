var gulp = require('gulp');
var connect = require('gulp-connect');
var juice = require('gulp-juice-concat');
var less = require('gulp-less');

gulp.task('juice', function(){
  gulp.src(['.tmp/html/*.html', '.tmp/css/*.css'])
    .pipe(juice({}))
    .pipe(gulp.dest('./_build'))
});

gulp.task('reload', function() {
  console.log('reloading');
  gulp.src('_build/*.html')
    .pipe(connect.reload());
})

gulp.task('less', function() {
  gulp.src('source/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('.tmp/css'))
});

gulp.task('css', function() {
  gulp.src('source/**/*.css')
    .pipe(gulp.dest('.tmp/css'));
})

gulp.task('html', function() {
  gulp.src('source/*.html')
    .pipe(gulp.dest('.tmp/html'))
});

gulp.task('watch', function() {
  gulp.watch('source/**/*.less', ['less', 'juice', 'reload']);
  gulp.watch('source/*.html', ['html', 'juice', 'reload']);
  gulp.watch('source/**/*.css', ['css', 'juice', 'reload']);
});

gulp.task('build', ['css', 'less', 'html', 'juice']);

gulp.task('serve', ['build'], function() {
  connect.server({
    root: '_build',
    livereload: true
  })
})

gulp.task('default', ['serve', 'watch'])
