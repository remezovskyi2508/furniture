import webpack from "webpack-stream";

export const js = () => { //называем задачу js
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) //получаем доступ к файлу, подключение карт к исходнику (sourcemaps)
        .pipe(app.plugins.plumber( //уведомление об ошибке
            app.plugins.notify.onError({
                title: "JS",  //вывод название ошибки
                message: "Error: <%= error.message %>"  //сообщение
            }))
        )
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}