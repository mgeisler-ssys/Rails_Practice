var tasksServices = angular.module('tasksServices', ['ngResource']);


tasksServices.factory('Tasks', function() {
    return {
        getPriorityString: function(priorityNum) {
            switch(priorityNum) {
                case 1:
                    return "Low";
                case 2:
                    return "Medium";
                case 3:
                    return "High";
                default:
                    console.log('Task Priority could not be set.');
                    return "Low";
            }
        },
        getCompletedString: function(completedBool) {
            stringOptions = ["Active","Completed"];
            if (completedBool == true){
                return stringOptions[1];
            }else {
                return stringOptions[0];
            }
        },
        getDateCompletedString: function(dateCompleted) {
            if (dateCompleted == ""){
                return "Pending";
            }else if (dateCompleted == undefined){
                return "N/A";
            }else {
                return dateCompleted;
            }
        }
    };
});


tasksServices.factory('Task', ['$resource',
    function($resource){
        console.log($resource);
        return $resource('tasks/:taskId.json', {}, {
            query: {method:'GET', params:{taskId:'taskId'}},
            update: {method:'POST', params:{taskId:'taskId'}},
            patch: {method:'PATCH', params:{task: 'task'}}
        });
    }]);