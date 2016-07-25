var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider){
    $routeProvider
    .when('/game',{
        templateUrl : 'pages/game.html',
        controller : 'gameController'
    })
    .otherwise(function($routeProvider){
        controller : 'contentController'
    });
});