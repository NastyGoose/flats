// dependencies
const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const minifyCSS = require('gulp-clean-css');
const changed = require('gulp-changed');
const gutil = require('gulp-util');

// sass-css paths
const sass_src = './src/assets/scss/**/*.scss';
const sass_dest = './src/assets/css';

// gulp tasks
gulp.task('compile_scss', () => {
  gulp.src(sass_src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(changed(sass_dest))
    .pipe(gulp.dest(sass_dest));
});

gulp.task('watch', () => {
  gulp.watch(sass_src, ['compile_scss']);
});

gulp.task('default', ['watch']);
