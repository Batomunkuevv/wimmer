import gulp from "gulp"; // Основной модуль
import { path } from "./gulp/config/path.js"; // Импорт путей
import { plugins } from "./gulp/config/plugins.js"; // Импорт общих плагинов

// Передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins,
};

// Импорт задач
import { moveProjectTable } from "./gulp/tasks/moveProjectTable.js";
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { propertiesCatalog } from "./gulp/tasks/properties-catalog.js";
import { quiz } from "./gulp/tasks/quiz.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.projectTable, moveProjectTable);
    gulp.watch(path.watch.propertiesCatalog, propertiesCatalog);
    gulp.watch(path.watch.quiz, quiz);
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, moveProjectTable, propertiesCatalog, quiz, html, scss, js, images));
// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Экспорт сценариев
export { dev, build };

// Выполнение сценария по умолчанию
gulp.task("default", dev);
