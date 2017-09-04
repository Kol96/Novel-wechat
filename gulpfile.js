const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat'); // 合并文件
const gulpsync = require('gulp-sync')(gulp);
const del = require('del');
const minimist = require('minimist');
const browserSync = require('browser-sync');

const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer'); // css前缀
const minifycss = require('gulp-minify-css'); // 压缩css

const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');

const imagemin = require('gulp-imagemin');

// 命令行输入 gulp XXX --env development
let knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'production'
    }
};
let options = minimist(process.argv.slice(2), knownOptions);

// 库
const vendor = {
    scripts: [
        './src/lib/angular/angular.js',
        './src/lib/ui-router/angular-ui-router.js',
        './src/lib/underscore/underscore.js',
        './src/lib/weui/weui.min.js'
    ],
    styles: [
        './src/lib/weui/weui.min.css',
        './src/lib/iconfont/iconfont.css'
    ]
};

const source = {
    scripts: [
        './src/*.js',
        './src/components/**/*.js',
        './src/pages/**/*.js',
    ],
    styles: [
        './src/index.scss',
        './src/components/**/*.scss',
        './src/pages/**/*.scss',
    ],
    templates: [{
            src: './src/index.html',
            dist: './dist/'
        },
        {
            src: './src/components/**/*.html',
            dist: './dist/components/'
        },
        {
            src: './src/pages/**/*.html',
            dist: './dist/pages/'
        }
    ],
    images: {
        src: './src/img/*',
        dist: './dist/img/'
    }
};

// JS Vendor
gulp.task('scripts:vendor', function () {
    return gulp.src(vendor.scripts)
        .pipe(concat('lib.min.js')) // 合并 JavaScript ，并设置合并后的文件名
        .pipe(uglify()) // 执行 JavaScript 压缩
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// JS Source
gulp.task('scripts:source', function () {
    return gulp.src(source.scripts)
        .pipe(concat('novel.min.js'))
        .pipe(gulpif(options.env === 'production', uglify())) // 仅在生产环境时候进行压缩
        .pipe(gulpif(options.env === 'production', stripDebug())) // 仅在生产环境时去掉console.log
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// sass -> css -> minifycss -> concat -> dest
// CSS Vendor
gulp.task('styles:vendor', function () {
    return gulp.src(vendor.styles)
        .pipe(sass())
        .pipe(minifycss())
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// CSS source
gulp.task('styles:source', function () {
    return gulp.src(source.styles) // 压缩的文件
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(minifycss()) // 执行压缩
        .pipe(concat('novel.min.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        })); //输出到指定目录
});

// html templates
gulp.task('templates', function () {
    source.templates.forEach(function (item) {
        gulp.src(item.src)
            .pipe(gulp.dest(item.dist))
            .pipe(browserSync.reload({
                stream: true
            }));
    })
});

// 图片
gulp.task('images', function () {
    gulp.src(source.images.src)
        .pipe(imagemin({
            optimizationLevel: 7
        }))
        .pipe(gulp.dest(source.images.dist));
});

// 热更新服务
gulp.task('browsersync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

// 清空dist
gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

// 监听
gulp.task('watch', function () {
    gulp.watch(['./src/*.html', './src/components/**/*.html', './src/pages/**/*.html'], ['templates']);
    gulp.watch(vendor.styles, ['styles:vendor']);
    gulp.watch(source.styles, ['styles:source']);
    gulp.watch(vendor.scripts, ['scripts:vendor']); // js库
    gulp.watch(source.scripts, ['scripts:source']); // 组件，页面脚本
    gulp.watch(source.images.src, ['images']);
});

gulp.task('default', gulpsync.sync([
    'scripts:vendor',
    'scripts:source',
    'styles:vendor',
    'styles:source',
    'templates',
    'images'
]));

gulp.task('serve', gulpsync.sync([
    'default',
    'watch',
    'browsersync'
]), function () {
    console.log('server run on ...');
});