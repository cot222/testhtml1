const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require("gulp-clean-css"),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify-es').default,
    webserver = require('browser-sync'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    fileInclude = require('gulp-file-include'),
    concat = require('gulp-concat');

var path = {
    build: {
        html: 'public/demo/',
        js: 'public/js/',
        css: 'public/css/',
        svg: 'public/svg/',
        fonts: 'public/fonts',
        json: 'public/'
    },
    src: {
        htmlStart: 'dev/src/html/index.html',
        html: 'dev/src/html/*.html',
        js: {
            jquery: 'dev/libs/jquery/dist/jquery.min.js',
            vivus: 'dev/libs/vivus/dist/vivus.min.js',
            myscript: 'dev/src/js/script.js',
        },
        style: 'dev/src/style/styles.scss',
        svg: 'dev/src/svg/*.svg',
        fonts: 'dev/src/fonts/**/*.{woff,woff2,txt,ttf,otf}',
        json: 'dev/'
    },
    watch: {
        html: 'dev/src/**/*.html',
        js: 'dev/src/js/**/*.js',
        css: 'dev/src/style/**/*.scss',
        svg: 'dev/src/svg/*.svg',
        fonts: 'dev/src/**/*.{woff,woff2,txt,ttf,otf}',
        json: 'dev/'
    },
    template: {
        svgSprite: 'dev/src/svg/template.html',
    },
    clean: 'public/demo/*'
};

/* настройки сервера */
var ws_config = {
    startPath: 'demo/index.html',
    server: {
        baseDir: 'public'
    },
    notify: false,
    files: [
        '/css/styles.css',
        '/js/script.js',
    ]
};

// запуск сервера
gulp.task('webserver', function () {
    webserver(ws_config);
});

gulp.task('html:build', function () {
    return gulp.src(path.src.htmlStart) // выбор всех html файлов по указанному пути
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
        .pipe(webserver.reload({ stream: true })); // перезагрузка сервера
});

gulp.task('json:build', function () {
    return gulp.src(path.src.json) // выбор всех html файлов по указанному пути
        .pipe(gulp.dest(path.build.json)) // выкладывание готовых файлов
        .pipe(webserver.reload({ stream: true })); // перезагрузка сервера
});

gulp.task('css:build', function () {
    return gulp.src(path.src.style) // получим styles.scss
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer()) // добавим префиксы
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({ stream: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCss()) // минимизируем CSS
        .pipe(gulp.dest(path.build.css)); // выгружаем в build
});

gulp.task('js:build', function () {
    return gulp.src([path.src.js.jquery, path.src.js.vivus, path.src.js.myscript]) // получим файл script.js
        .pipe(concat("script.js"))
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify()) // минимизируем js
        .pipe(webserver.reload({ stream: true }))
        .pipe(gulp.dest(path.build.js)); // положим готовый файл
});

gulp.task('svg:build', function () {
    return gulp.src(path.src.svg)
        .pipe(svgmin())
        .pipe(cheerio({parserOptions: {xmlMode: true}}))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
                mode: {
                    stack: {sprite: "../sprite.svg"},
                    css: {render: {css: true,}},
                    scss: true,
                },
                shape: {
                    dimension: {maxWidth: 100,maxHeight: 100,},
                },
            }
        ))
        .pipe(gulp.dest(path.build.svg));
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts));
});

gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
        // .pipe(rimraf());
});

gulp.task('build',
    gulp.parallel(
        'css:build',
        'js:build',
        'svg:build',
        'fonts:build',
        'json:build'
    )
);

gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.svg, gulp.series('svg:build'));
    gulp.watch(path.watch.json, gulp.series('json:build')); 
});

gulp.task('watch:webserver', gulp.series(
    'build',
    'html:build',
    gulp.parallel('webserver','watch')
));

gulp.task('default', gulp.series('build'));
