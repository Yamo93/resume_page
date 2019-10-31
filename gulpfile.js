// Importerar Gulp-metoder 
const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');

// Importerar Gulp-plugins
const concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean-fix'),
    terser = require('gulp-terser'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel');

sass.compiler = require('node-sass');

// Sökvägar
const paths = {
    allFiles: 'src/**/*.*',
    htmlFiles: 'src/**/*.html',
    imageFolder: 'src/img/*.*',
    cssFiles: 'src/**/*.css',
    jsFiles: 'src/**/*.js',
    scssFiles: 'src/scss/*.scss',
    htAccess: 'src/.htaccess'
};

// Spinnar upp en server och skapar en lyssnare för olika typer av filer och uppgifter
function watchTask() {
    watch([paths.allFiles, paths.htmlFiles, paths.imageFolder, paths.cssFiles, paths.jsFiles,  paths.scssFiles, paths.htAccess],
        parallel(copyHTML, copyImages, copyHtAccess, compileToSCSS, jsTask));
    connect.server({
        root: 'pub',
        livereload: true
    });
}

// Kopierar HTML-filer till pub och laddar om webbläsaren
function copyHTML() {
    return src(paths.htmlFiles)
        .pipe(dest('pub'))
        .pipe(connect.reload());
}

function copyHtAccess() {
    return src(paths.htAccess)
        .pipe(dest('pub'))
}

// Kopierar bilder till pub och laddar om webbläsaren
function copyImages() {
    return src(paths.imageFolder)
        .pipe(dest('pub/img'))
        .pipe(connect.reload());
}

// Rensar pub-katalogen initialt
function cleanPub() {
    return src('pub')
        .pipe(clean());
}

// Konkatenerar och minifierar JS-filer och laddar om webbläsaren
function jsTask() {
    return src(paths.jsFiles)
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(dest('pub/js'))
        .pipe(connect.reload());
}

// Konkatenerar SCSS-filerna, kompilerar SCSS till CSS, minifierar CSS-produkten och distribuerar filen i den publika CSS-katalogen
function compileToSCSS() {
    return src(paths.scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(concat('main.css'))
        .pipe(dest('pub/css'))
        .pipe(connect.reload());
}


// Rad av uppgifter som körs vid "gulp"-kommandot
exports.default = series(
    cleanPub,
    copyHTML,
    copyImages,
    copyHtAccess,
    compileToSCSS,
    jsTask,
    watchTask
);