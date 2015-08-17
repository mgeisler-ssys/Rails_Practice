var app = angular.module('tasks',[
    'ngRoute',
    'tasksControllers',
    'tasksServices',
    //'tasksAnimations',
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
            when( '/tasks/modal', {
                templateUrl: '_modal.html',
                controller: 'ModalDemoCtrl'
            }).
            otherwise({
                redirectTo: '/tasks'
            });
    }]);

