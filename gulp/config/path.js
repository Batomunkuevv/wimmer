// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/images/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
        projectTable: `${buildFolder}/project-table/`
    },
    src: {
        js: `${srcFolder}/js/*.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        scss: `${srcFolder}/scss/*.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        projectTable: `${srcFolder}/project-table/**/*.*`,
        propertiesCatalog: `${srcFolder}/properties-catalog/properties-catalog.js`,
        quiz: `${srcFolder}/quiz/quiz.js`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
        files: `${srcFolder}/files/**/*.*`,
        projectTable: `${srcFolder}/project-table/**/*.*`,
        propertiesCatalog: `${srcFolder}/properties-catalog/**/*.*`,
        quiz: `${srcFolder}/quiz/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder
};
