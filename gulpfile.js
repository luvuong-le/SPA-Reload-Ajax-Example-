const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');

/* 
    Top Level Functions

    gulp.task - Define Tasks
    gulp.src - Point to files to use
    gulp.dest - Point to folder to output
    gulp.watch - Watch files/folders for change
*/

// Optimize and Compress Images
gulp.task('imagemin', () => {
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

// Minify JS
gulp.task('minifyjs', () => {
    gulp.src('dist/js/bundle.min.js')
    .pipe(babel({
        presets: ['env'],
        compact: false
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Compile Sass, add prefixers and Minify Output CSS
gulp.task('sass', () => {
    gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
        autoprefixer({ browsers: ['last 10 versions']})
    ]))
    .pipe(cleanCSS({
        debug: true,
        compatibility: 'ie8'
    }))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['imagemin', 'minifyjs', 'sass']);
gulp.task('dev:sass', ['sass']);

gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['minifyjs']);
    gulp.watch('src/images/*', ['imagemin']);
    gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('watch:sass', () => {
    gulp.watch('src/scss/*.scss', ['sass']);
})