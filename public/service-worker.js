console.log("Hello from your service worker!")

const FILES_TO_CACHE = [
    'icons\icon-192x192.png',
    'icons\icon-512x512.png',
    'indexedDB.js',
    'index.html',
    '/',
    'index.js',
    'service=worker.js',
    'styles.css'    
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

