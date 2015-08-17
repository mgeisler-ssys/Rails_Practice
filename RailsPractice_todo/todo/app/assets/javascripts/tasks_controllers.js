var tasksControllers = angular.module('tasksControllers', []);

tasksControllers.controller('TaskListCtrl', ['$scope', '$location','$http', 'Task', 'Tasks',
    function($scope, $location, $http, Task, Tasks){
        $scope.completed_task = "";
        $scope.orderProp = 'title';
        //$scope.tasks = Task.query();
        $scope.go = function ( path ) {
            $location.path( path );
        };
        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];

        $scope.saveSuccessAlert = function() {
            $scope.alerts.push({msg: 'Task Saved Successfully!'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
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

        $scope.showModal = false;
        $scope.buttonClicked = "";

        $scope.toggleModal = function(btnClicked){
            console.log("INSIDE TOGGLE MODAL");
            $scope.buttonClicked = btnClicked;
            console.log($scope.buttonClicked);
            console.log(btnClicked);

            $scope.showModal = !$scope.showModal;
            console.log($scope.showModal);
        };
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


tasksControllers.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ buttonClicked }} clicked!!</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
//look up angular model tutorial (youtube?)
    //eventually move stuff into services.
    //include services - depend on $http
