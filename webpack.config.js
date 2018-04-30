const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/canvas-nest-class.js',
    output: {
        filename: 'canvas-nest-class.js',
        path: path.resolve(__dirname, 'dist'),
        library: "CanvasNest",
        libraryTarget: "umd",
        libraryExport: 'default',
    }
};