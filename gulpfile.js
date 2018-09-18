// dependencies
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const notify = require('gulp-notify');
const livereload = require('gulp-livereload');
const minifyCSS = require('gulp-clean-css');
const changed = require('gulp-changed');
const gutil = require('gulp-util');

// sass-css paths
const sass_src = './src/assets/scss/**/*.scss';
const sass_dest = './src/assets/css';

// gulp tasks
gulp.task('webpack', () => gulp.src('./src/App.js')
  .pipe(webpackStream({
    output: {
      filename: 'App.js',
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/i,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['env', 'es2015', 'react', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', ['transform-react-jsx']],
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
        {
          test: /\.(scss|css)$/i,
          use: [
            {
              loader: 'style-loader', // creates style nodes from JS strings
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
            },
          ],
        },
      ],
    },
  }))
  .on('error', function (error) { // Error reporting
    notify().write({
      message: error.message,
    });
    this.emit('end'); /* Allow Webpack to continue watching on error */
  })
  .pipe(gulp.dest('./public/'))
  .pipe(notify({// Notifiy me when the file is built
    title: 'Webpack',
    message: 'Generated file: <%= file.relative %>',
  }))
  .pipe(livereload())// Run livereload
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./public/')));

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
  gulp.watch('./src/**/*.{js,jsx}', ['webpack']);
});

gulp.task('default', ['watch']);
