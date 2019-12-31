requirejs.config({
    baseUrl: 'vendor/lib/',
    packages: [{
        name:'vendor',
        location:'./vendor/lib',
        main: 'vendor'
    }],
    paths:{
        jquery:'vendor/lib/jquery-1.7.2.min.js',
        iScroll:'vendor/lib/iscroll.js',
        layer:'vendor/lib/layer.js'

    }
});
requirejs(['jquery', 'canvas', 'app/sub'],
    function   ($,        canvas,   sub) {

    });