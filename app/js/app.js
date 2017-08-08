
var app=angular.module('todoList', ['ngRoute', 'todoHome','todoDirective', 'appTodoService']);

app.config(['$routeProvider', function($routeProvider) {
 $routeProvider.
        when('/', {
            templateUrl: '/partials/todo-home.html',
            controller: 'todoHomeCtrl'
        }).	
        otherwise({
            redirectTo: '/'
        });
}]);