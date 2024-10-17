import path from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import TerserPlugin from 'terser-webpack-plugin';

export const propertiesCatalog = () =>
    app.gulp
        .src(app.path.src.propertiesCatalog, { sourcemaps: app.isDev })
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "JS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            webpackStream({
                entry: path.resolve(app.path.src.propertiesCatalog),
                mode: app.isBuild ? 'production' : 'development',
                resolve: {
                    extensions: ['.jsx', '.js']
                },
                output: {
                    filename: 'properties-catalog.js',
                },
                plugins: [
                    new webpack.LoaderOptionsPlugin({
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    })
                ],
                module: {
                    rules: [
                        {
                            test: /\.(js|jsx)$/,
                            exclude: /node_modules/,
                            use: ['babel-loader'],
                        },
                    ],
                },
                optimization: {
                    minimize: true,
                    minimizer: [
                        new TerserPlugin({
                            extractComments: false,
                        }),
                    ],
                },
            })
        )
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream());
