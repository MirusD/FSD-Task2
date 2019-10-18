var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug');

// var jsFiles = [
//     './src/js/main.js',
//     './src/js/popup.js'
// ];

//PUG
gulp.task('pug', function() {
    return gulp.src("./src/index.pug")
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});

//SASS
gulp.task('sass', function(){
    return gulp.src('./src/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 12 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
});

//BROWSERSYNC
gulp.task('browserSync', function() {
    browserSync.init({
        server: { baseDir: './dist'},
        // notify: false
    })
});

// gulp.task('cleanCSS', function(){
//     return gulp.src('./src/css/**/*.css')
//         .pipe(cleanCSS({level: 2}))
//         .pipe(gulp.dest('./build/css'))
//         .pipe(browserSync.stream())
// });
//
// //SCRIPT
// gulp.task('script', function(){
//     return gulp.src(jsFiles)
//         .pipe(concat('script.js'))
//         .pipe(gulp.dest('./src/js'))
//         .pipe(browserSync.stream());
// });
// gulp.task('uglify', function(){
//     return gulp.src('./src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/js'))
//         .pipe(browserSync.stream());
// });
//
// //HTML
// gulp.task('html', function() {
//     return gulp.src('./src/modules/index.html')
//         .pipe(rigger())
//         // .pipe(gulpIf(env !== 'dev', minifyHTML()))
//         .pipe(gulp.dest('./build/'))
// });
// gulp.task('Buildhtml', function() {
//     return gulp.src('./src/*.html')
//         .pipe(gulp.dest('./build'))
// });
//
// //IMG
// gulp.task('img', function() {
//     return gulp.src('./src/img/**.*')
//         .pipe(gulp.dest('./build/img/'))
// });
//
//

// gulp.task('browserSyncBuild', function() {
//     browserSync.init({
//         server: { baseDir: './build'},
//         // notify: false
//     })
// });

gulp.task('watch', function() {
    gulp.watch('./src/**/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/**/*.pug', gulp.parallel('pug')).on('change',browserSync.reload);
    // gulp.watch('./src/img/*.*', gulp.parallel('img'));
    // gulp.watch(['./src/js/*.js','!./src/js/script.js'], gulp.parallel('script'));
});
//
//
// gulp.task('default', gulp.parallel('html', 'sass', 'img', 'browserSync', 'watch'));
gulp.task('default', gulp.parallel('pug', 'sass', 'browserSync', 'watch'));
// gulp.task('build', gulp.parallel('sass', 'script', 'cleanCSS', 'uglify', 'Buildhtml','browserSyncBuild'));