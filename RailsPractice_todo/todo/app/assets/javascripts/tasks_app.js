var app = angular.module('tasks',[
    'ngRoute',
    'tasksControllers'
]);


app.config(['$routeProvider',
    function($routeProvider) {
        console.log($routeProvider);
        console.log("INSIDE CONFIG");
        $routeProvider.
            when('/tasks', {
                templateUrl: '_task_list.html',
                controller: 'TaskListCtrl'
            }).
            when('/tasks/:taskId', {
                templateUrl: '_task_detail.html',
                controller: 'TaskDetailCtrl'
            }).
            //when('/tasks/:taskId/edit', {
            //    templateUrl: '_task_detail.html',
            //    controller: 'TaskDetailCtrl'
            //}).
            //when('/tasks/new', {
            //    templateUrl: 'new.html.erb',
            //    controller: 'TaskNewCtrl'
            //}).
            otherwise({
                redirectTo: '/tasks'
            });
    }]);

