const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');

gulp.task('resize', function() {
    gulp.src('src/img/*')
        .pipe(imageResize({
            width: 600,
            height: 450,
            crop: false,
            upscale: false
        })).on('error', function(e) {
            console.log(e);
        })
        .pipe(gulp.dest('dist/img/resized_img'));
});

gulp.task('imageMin', function () {
    gulp.src('dist/img/resized_img/*')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest('dist/img/imageMin'));
});

gulp.task('imageMin_large', function() {
    gulp.src('src/img/*')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest('dist/img/imageMin_large'));
});

gulp.task('default', ['resize', 'imageMin', 'imageMin_large']);