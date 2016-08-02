app.controller("gameController", ['$scope', '$http', "roomService", function($scope, $http, roomService){
    $scope.roomData = {'text': 'none', 'done':"none"}
    /*$scope.roomDesc = "";
    $scope.roomItems = "";
    $scope.roomNpcs = "";

    $scope.northRoom = "";
    $scope.southRoom = "";
    $scope.eastRoom = "";
    $scope.westRoom = "";
    $scope.upRoom = "";
    $scope.downRoom = "";*/
    $scope.currInput = "..."
    $scope.currOutput = "You find yourself in a dark room..."

    $scope.textList = []

    $scope.newRoomData = {}
    //stores the player's information
    $scope.player = {
        lastCommand: "",
        inv: [],
        power: 0,
        damaga: 0
    }
   

    //the game world is divided into sections (each in their own json file)
    //accessing a room requires accessing its file, and then the specific room name
    //loads a new room and preps its information
    //using the roomService factory 
    $scope.loadRoom = function(roomName) {
        //reset all room directions
        //add the location of the room json file (prefix)
        //and filetype (suffix)
        var prefix = "rooms/";
        var suffix = ".json"; 
        url = prefix+roomName+suffix;
        //roomService.getData(prefix+roomName+suffix)
        room = $http.get(url).success(function(response){
            /*$scope.roomData = response;
            //it's easiest to pack multiple objects into a list
            //by storing them as a space-delimited list that's then split
            $scope.roomDesc = response['text'];
            $scope.roomNpcs = JSON.stringify(response['npcs']).split(" ");
            $scope.roomItems = JSON.stringify(response['items']).split(" ");   
            $scope.textList.push($scope.roomDesc)   
            //load the adjacent rooms
            $scope.northRoom = response['north_room'];
            $scope.southRoom = response['south_room'];
            $scope.eastRoom = response['east_room'];
            $scope.westRoom = response['west_room'];
            $scope.upRoom = response['up_room'];
            $scope.downRoom = response['down_room'];*/   

            $scope.roomData = response;
            $scope.textList.push($scope.roomData.text);
        });
    }
    $scope.loadRoom("firstRoom");
 
    $scope.submit = function(){
        if ($scope.currInput){
            //push the last input and output strings to keep track of them for later rendering
            $scope.textList.push(">> " + $scope.currInput)
            //store the last command
            $scope.player.lastCommand = $scope.currInput;
            $scope.currInput = "";
           
            //process the player input
            $scope.processInput($scope.player.lastCommand);
        } 
        $scope.trimTextList();
    };

    //deal with user input after submission
    $scope.processInput = function(input){
        //determine if input is a move command
        var directions = ['up','down','north','east','west','south'];
        var cantMoveMessage = "You cannot move that way";
        var moveTo = ""
        if(directions.indexOf(input) > -1){
            switch (input){
                /*case "up" && $scope.roomData.upRoom:
                    if(upRoom){
                        moveTo = $scope.roomData.upRoom;
                    }
                    break;*/
                case "down":
                    if(downRoom){
                        moveTo = $scope.roomData.downRoom;
                    }
                    break;
                case "north" && $scope.roomData.northRoom:
                    alert($scope.roomData.northRoom)
                    moveTo = $scope.roomData.northRoom.room;
                    break;
                case "south":
                    moveTo = $scope.roomData.southRoom;
                    break;
                case "west":
                    moveTo = $scope.roomData.westRoom;
                    break;
                case "east":
                    moveTo = $scope.roomData.eastRoom;
                    break;
            }
            //ensure it's possible to actually move in this directions
            if (moveTo == ""){
                $scope.textList.push("It is impossible to move that way");
            }
            else{
                $scope.loadRoom(moveTo);
            }
        }
        //if the input is a question, return unhelpful snark 
        else if(input.endsWith("?")){
            $scope.textList.push("Now is not the time for questions. It is time for action!")
        }
        //otherwise, not sure what was intended with the input
        else{
            $scope.textList.push("I'm not sure what you're trying to say.");
        }
    }
    //trim the number of text outputs that can occur at one time
    $scope.trimTextList = function(){
        if($scope.textList.length > 8){
            $scope.textList.splice(0, 1)
        }
    }

    
}])