var tasksControllers = angular.module('tasksControllers', []);

tasksControllers.controller('TaskListCtrl', ['$scope', '$location','$http', 'Task', 'Tasks',
    function($scope, $location, $http, Task, Tasks){
        $scope.completed_task = "";
        $scope.orderProp = 'title';
        //$scope.tasks = Task.query();
        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.setPriorityString = function(priorityNum){
            $scope.priority_string = Tasks.getPriorityString(priorityNum);
            return $scope.priority_string;
        }
        $scope.setCompletedString = function(completedBool){
            $scope.completed_bool = Tasks.getCompletedString(completedBool);
            return $scope.completed_bool;
        }
        $scope.setDateCompletedString = function(dateCompleted){
            $scope.date_completed_string = Tasks.getDateCompletedString(dateCompleted);
            return $scope.date_completed_string;
        }
        $http.get("/tasks.json"
        ).success(
            function(data,status,headers,config) {
                $scope.tasks = data;
            }).error(
            function(data,status,headers,config) {
                alert("There was a problem: " + status);
            })

        $scope.deleteTask = function(task_id){
            console.log("INSIDE DELETE TASK");
            console.log(task_id);
            $http.delete('tasks/' + task_id).
                success(function() {
                    alert(task_id + "task was deleted");
                }).
                error(function() {
                    console.log('Could not delete task from list: ' + task_id);
                });
            $http.get("/tasks.json"
            ).success(
                function(data,status,headers,config) {
                    $scope.tasks = data;
                }).error(
                function(data,status,headers,config) {
                    alert("There was a problem: " + status);
                })
            go('/tasks');
        }

        $scope.completeTask = function (task_id) {
            $scope.task = Task.query({taskId: task_id});
            $scope.task.completed = true;
            $http.patch('tasks/' + task_id + '.json', {task:$scope.task}).
                then(function(response) {
                    console.log("Successful Update.");
                    $http.get("/tasks.json"
                    ).success(
                        function(data,status,headers,config) {
                            $scope.tasks = data;
                        }).error(
                        function(data,status,headers,config) {
                            alert("There was a problem: " + status);
                        })
                }, function(response) {
                    console.log("Failure when Updating" + $scope.task);
                });
        }

    }
]);

tasksControllers.controller('TaskDetailCtrl', ['$scope', '$location', '$http', '$routeParams', 'Task',
    function($scope, $location, $http, $routeParams, Task) {
        $scope.taskId = $routeParams.taskId;
        $scope.task = Task.query({taskId: $scope.taskId});
        console.log($scope.task);
        $scope.priorities = [
            { id: 1, title: 'Low' },
            { id: 2, title: 'Medium' },
            { id: 3, title: 'High' }
        ];
        $scope.go = function ( path ) {
            $location.path( path );
        };



        $scope.updateTask = function (id, title, description, priority) {
            //post method to update in rails controller.
            //PATCH /tasks/:id

            console.log($scope.task);
            console.log($location);
            var date = new Date();
            if ($location.path() == '/tasks/new'){
                console.log($scope.task);
                $scope.task.created_at = date;
                $http.post("/tasks", {task:$scope.task}).success(function(data, status) {
                        console.log(data);
                })

            }
            else {
                if ($scope.task.completed == true){

                    $scope.task.date_completed = date;
                }
                $http.patch('tasks/' + $scope.taskId + '.json', {task:$scope.task}).
                    then(function(response) {
                        console.log("Successful Update.");
                    }, function(response) {
                        console.log("Failure when Updating" + $scope.task);
                    });

                $scope.go('/tasks');
            }

        };
    }]);


tasksControllers.controller('TaskNewCtrl', ['$scope', '$location', '$http', '$routeParams',
        function($scope, $location, $http, $routeParams) {
            $scope.task = Task.query({taskId: $routeParams.taskId});
            console.log("INSIDE NEW CONTROLLER");


            $scope.newTask = function(){
                // $http.get('tasks/new').success(function(data) {
                //    $scope.getData = data;
                //    console.log($scope.getData);
                //});
                //$scope.result = Task.patch({task: $scope.task});

                console.log("INSIDE NEWTASK");
                $http.get("tasks/new.json"
                ).success(
                    function(data,status,headers,config) {
                        $scope.task = data;
                    }).error(
                    function(data,status,headers,config) {
                        console.log("Could not fetch new task: " + status);
                    })
                //
                //$http.post("/tasks", {task:$scope.task}).success(function(data, status) {
                //    console.log("Inside newTask()");
                //    console.log(data);
                //})
            }
            //$scope.createTask = function() {
            //    $http.post('/tasks', {params: {}}).
            //        then(function(response) {
            //            // this callback will be called asynchronously
            //            // when the response is available
            //        }, function(response) {
            //            // called asynchronously if an error occurs
            //            // or server returns response with an error status.
            //        });
            //}

        }
    ]);

tasksControllers.controller('ModalDemoCtrl', function ($scope, $modal, $log) {
    console.log("INSIDE MODALDEMOCTRL");
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

tasksControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
//look up angular model tutorial (youtube?)
    //eventually move stuff into services.
    //include services - depend on $http
