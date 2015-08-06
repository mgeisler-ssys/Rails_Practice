var tasksControllers = angular.module('tasksControllers', []);

tasksControllers.controller('TaskListCtrl', ['$scope', '$location', '$http',
    function($scope, $location, $http) {
        $scope.completed_task = "";
        $scope.orderProp = 'title';

        $scope.go = function ( path ) {
            console.log("INSIDE GO FUNC");
            console.log(path);
            $location.path( path );
        };

        console.log("INSIDE CONTROLLER");
        $http.get("/tasks.json"
        ).success(
            function(data,status,headers,config) {
                $scope.tasks = data;
            }).error(
            function(data,status,headers,config) {
                alert("There was a problem: " + status);
            })

        $scope.newTask = function(){
            $http.get("/tasks/new")
                .success(
                function(data, status, headers, config) {
                    $scope.task = data
                }
            )
        }
    }
]);

tasksControllers.controller('TaskDetailCtrl', ['$scope', '$location', '$http', '$routeParams',
    function($scope, $location, $http, $routeParams) {
        $scope.taskId = $routeParams.taskId;

        $scope.go = function ( path ) {
            console.log("INSIDE GO FUNC");
            console.log(path);
            $location.path( path );
        };

        $http.get('tasks/' + $scope.taskId + '.json').success(function(data) {
            //show endpoint in rails controller.
            $scope.task = data;
        }).error(
            function(data,status,headers,config) {
                alert("There was a problem: " + status);
            }
        );
    }]);



//tasksControllers.controller('TaskNewCtrl', ['$scope', '$location', '$http', '$routeParams',
//    function($scope, $location, $http, $routeParams) {
//
//    }]);
//look up angular model tutorial (youtube?)
    //eventually move stuff into services.
    //include services - depend on $http
