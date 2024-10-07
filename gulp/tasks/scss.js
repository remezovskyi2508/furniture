import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //Compress CSS file
import webpcss from 'gulp-webpcss'; //Output WEBP images
import autoprefixer from 'gulp-autoprefixer'; //Add prefixes
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => { //называем задачу scss
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) //получаем доступ к файлу, подключение карт к исходнику (sourcemaps)
        .pipe(app.plugins.plumber( //уведомление об ошибке
            app.plugins.notify.onError({
                title: "SCSS",  //вывод название ошибки
                message: "Error: <%= error.message %>"  //сообщение
            }) 
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )
        )
        //Дубляж в случае надобности второго файла со стилями заместь мин.
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
    