app.controller("gameController", ['$scope', function($scope){
    $scope.player = {
        lastCommands: [], 
        inv: []
    }
    $scope.currInput = "..."
    $scope.currOutput = "You find yourself in a dark room..."


    $scope.textList = []

    $scope.submit = function(){
        if ($scope.currInput){
            //push the last input and output strings to keep track of them for later rendering
            $scope.textList.push($scope.currInput)
            $scope.textList.push($scope.currOutput)

            $scope.player.lastCommands.push($scope.currInput);
            $scope.currInput = ""
        } 
    };
    
}])