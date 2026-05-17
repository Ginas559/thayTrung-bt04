const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    // Cấu hình thư mục views và template engine là ejs
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs');

    // Cấu hình các file tĩnh (static files): image/css/js
    app.use(express.static(path.join('./src', 'public')));
}

module.exports = configViewEngine;