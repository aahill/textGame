app.controller("gameController", ['$scope', '$http', "roomService", function($scope, $http, roomService){
    $scope.roomData = {'text': 'none', 'done':"none"}
    $scope.roomDesc = "xxx";
    //stores the player's information
    $scope.player = {
        lastCommands: [], 
        inv: []
    }
   

    //the game world is divided into sections (each in their own json file)
    //accessing a room requires accessing its file, and then the specific room name
    //loads a new room and preps its information
    //using the roomService factory 
    $scope.loadRoom = function(roomName) {
        //add the location of the room json file (prefix)
        //and filetype (suffix)
        var prefix = "rooms/";
        var suffix = ".json"; 
        url = prefix+roomName+suffix;
        //roomService.getData(prefix+roomName+suffix)
        room = $http.get(url).success(function(response){
            $scope.roomData = response;
            $scope.roomDesc = response['text'];
            
        });
    }
    $scope.loadRoom("firstRoom");
    //alert($scope.roomData['text'])
    //$scope.roomDesc = $scope.roomData['text'];
    $scope.currInput = "..."
    $scope.currOutput = "You find yourself in a dark room..."
    //current room data. Set to get the starting room initially

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