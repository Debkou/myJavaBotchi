import 'dotenv/config';
import { defineConfig } from "vite";
import { getMaps, getMapsOptimizers, getMapsScripts, LogLevel, OptimizeOptions } from "wa-map-optimizer-vite";

const maps = getMaps();

let optimizerOptions: OptimizeOptions = {
    logs: process.env.LOG_LEVEL && process.env.LOG_LEVEL in LogLevel ? LogLevel[process.env.LOG_LEVEL] : LogLevel.NORMAL,
};

if (process.env.TILESET_OPTIMIZATION && process.env.TILESET_OPTIMIZATION === "true") {
    const qualityMin = process.env.TILESET_OPTIMIZATION_QUALITY_MIN ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MIN) : 0.9;
    const qualityMax = process.env.TILESET_OPTIMIZATION_QUALITY_MAX ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MAX) : 1;

    optimizerOptions.output = {
        tileset: {
            compress: {
                quality: [qualityMin, qualityMax],
            }
        }
    }
}

export default defineConfig({
    base: "./",
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                index: "./index.html",
                menue: "./menue.html",
                bib: "./bibliothek.html",
                pageOne: "./page1.html",
                flyer: "./flyer_party.html",
                bibHome: "./bib_home.html",
                bibTer: "./bib_terminal.html",
                bibEins: "./bib_einheit1.html",
                bibZwei: "./bib_einheit2.html",
                bibDrei: "./bib_einheit3.html",
                bibVier: "./bib_einheit4.html",
                bibEinleitung: "./bib_einleitung.html",
                bibTest1: "./einheit1_test.html",
                test1Loesung: "./test1_loesung.html",
                eingabeTest1: "./eingabeTest.html",
                hinweisHR: "./hinweis1.html",
                licht: "./levelEinsLicht.html",
                gitterTuer: "./levelEinsGitter.html",
                postIt1a: "./postIt1a.html",
                postIt1b: "./postIt1b.html",
                postIt2a: "./postIt2a.html",
                postIt2b: "./postIt2b.html",
                postIt3a: "./postIt3a.html",
                postIt3b: "./postIt3b.html",
                postIt4a: "./postIt4a.html",
                postIt4b: "./postIt4b.html",
                levelEInsTresor: "./levelEinsTresor.html",
                levelEInsVorhang: "./levelEinsVorhang.html",
              
                ...getMapsScripts(maps),
            },
        },
    },
    plugins: [...getMapsOptimizers(maps, optimizerOptions)],
    server: {
        host: "localhost",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Cache-Control": "no-cache, no-store, must-revalidate",
        },
        open: "/",
    },
});
