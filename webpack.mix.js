let mix = require('laravel-mix');

// mix.js('resourses/js/app.js', 'public/js/app.js').setPublicPath('public/css/app.css');
mix.js('resourses/js/app.js', 'public/js/app.js').sass('resourses/scss/app.scss', 'public/css/app.css');