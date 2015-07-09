var gulp = require('gulp');
var juice = require('gulp-juice-concat');

gulp.task('juice', function(){
  gulp.src(['./source/**/*.html', './source/**/*.css'])
    .pipe(juice({}))
    .pipe(gulp.dest('./_build'));
});
