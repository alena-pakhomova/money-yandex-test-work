"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");

gulp.task("build", function() {
    return gulp.src("./js/**/*.js")
        .pipe(concat("app.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.watch("./js/**/*.js", gulp.series("build"))