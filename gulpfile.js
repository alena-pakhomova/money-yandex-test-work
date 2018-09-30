"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const debug = require("gulp-debug");

const customHtmlPath = [ 
    "./index.html", 
    "./page-card.html"
];

const vendorCssPath = [ 
    "./node_modules/bootstrap/dist/css/bootstrap.min.css", 
    "./node_modules/bootstrap/dist/css/bootstrap.min.css.map"
];

const vendorJsPath = [ 
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/jquery/dist/jquery.min.map",
    "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map"
];

gulp.task("build:customHtml", function() {
    return gulp.src(customHtmlPath)
        .pipe(gulp.dest("./dist"));
});

gulp.task("build:customFont", function() {
    return gulp.src("./font/*.ttf")
        .pipe(gulp.dest("./dist/font"));
});

gulp.task("build:customImages", function() {
    return gulp.src("./img/**")
        .pipe(gulp.dest("./dist/img"));
});

gulp.task("build:customCss", function() {
    return gulp.src("./css/style.css")
        .pipe(debug({ title: "src" }))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("build:customJs", function() {
    return gulp.src("./js/**/*.js")
        .pipe(debug({ title: "src" }))
        .pipe(concat("app.js"))
        .pipe(debug({ title: "concat" }))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("build:vendorCss", function() {
    return gulp.src(vendorCssPath)
        .pipe(debug({ title: "src" }))
        .pipe(gulp.dest("./dist/vendor/css"));
});

gulp.task("build:vendorJs", function() {
    return gulp.src(vendorJsPath)
        .pipe(debug({ title: "src" }))
        .pipe(gulp.dest("./dist/vendor/js"));
});

gulp.task("build", gulp.parallel("build:customHtml",
                                 "build:customFont", 
                                 "build:customImages", 
                                 "build:customCss", 
                                 "build:customJs", 
                                 "build:vendorCss", 
                                 "build:vendorJs")
);