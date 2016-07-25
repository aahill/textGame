app.controller("gameController", ['$scope', function($scope){
    $scope.player = {lastCommand: ""}
    $scope.currInput = "..."

    $scope.submit = function(){
        if ($scope.currInput){
            $scope.player.lastCommand = $scope.currInput;
            $scope.currInput = ""
        } 
    };
    
}])