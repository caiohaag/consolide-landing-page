var gulp = require("gulp"),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  minifycss = require('gulp-minify-css'),
  config = require('./gulpconfig.json'),
  uglify = require('gulp-uglify'),  
  concat = require('gulp-concat'),
  rev = require('gulp-rev'),
  htmlmin = require('gulp-htmlmin'),
  { watch } = require('gulp');


const browserSync = require('browser-sync');

// CSS
function css(cb) {
  gulp.src([config.folder.sass + '/**/main.scss'])
  .pipe(plumber({
      errorHandler: function(error) {
          this.emit('end');
      }
  }))
  .pipe(sass())
  .pipe(rename({ basename: config.folder.default_name }))
  .pipe(gulp.dest(config.folder.srccss))
  .pipe(rename({
      basename: config.folder.default_name,
      suffix: '.min'
  }))
  .pipe(minifycss())
  .pipe(gulp.dest(config.folder.css))
  .pipe(browserSync.reload({ stream: true }))
cb();
}

// JS
function js(cb) {
  gulp.src('assets/js/src/main.js')
  .pipe(plumber({
      errorHandler: function(error) {
          this.emit('end');
      }
  }))
  .pipe(uglify({
      mangle: {
          toplevel: true
      }
  }))            
  .pipe(rename({
      basename: config.folder.default_name,
      suffix: '.min'
  }))
  .pipe(gulp.dest(config.folder.javascript))     
  .pipe(browserSync.reload({ stream: true }))         
cb();
}

gulp.task('minify-html', function(done) {
  gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'));
    done();
  });

gulp.task('pack-js', function (done) {    
  gulp.src(['assets/js/lib/*.js', 'assets/js/dist/main.min.js'])
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('build/assets/js'));
      done();
});

gulp.task('pack-css', function (done) {    
  gulp.src(['assets/css/dist/main.min.css', 'assets/css/lib/*.css'])
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('build/assets/css'));
      done();
});

gulp.task('build', gulp.series('minify-html', 'pack-js', 'pack-css'));

exports.default = function() { 
  // Task css
  watch(config.folder.sass + '/**/*.scss', css);
  // Task JS
  watch('assets/js/src/main.js', js);
};