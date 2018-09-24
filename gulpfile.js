//引入包gulp
var gulp = require('gulp');


//sass
var sass = require('gulp-sass');
gulp.task('sass',function(){
    return gulp.src('sass')
               .pipe(sass())
               .pipe(gulp.dest('dest'));
});

//压缩css
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
gulp.task('cssmin',function(){
    return gulp.src('css/opacity.css')
               .pipe(cssmin())
               .pipe(rename('opacity.min.css'))
               .pipe(gulp.dest('dest/css'));
});

//压缩js
var jsmin = require('gulp-uglify');

gulp.task('jsmin',function(){
    return gulp.src('js/banner.js')
               .pipe(jsmin())
               .pipe(rename('banner.min.js'))
               .pipe(gulp.dest('dest/js'));
});

var imgmin = require('gulp-imagemin');
gulp.task('imgmin',function(){
    return gulp.src('img/*')
               .pipe(imgmin())
               .pipe(gulp.dest('dest/img'));
});


//合并文件
// var concat = require(;gulp-concat);

// gulp.task('concat',function(){
//     return gulp.src([''])
// });