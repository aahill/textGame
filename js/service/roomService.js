//gets json data from another file and returns it
app.
factory("roomService", function($http){
    return{
        getData: function(url){
            //return $http.get(url);
            var request = $http.get(url).then(function(response){
                return response.data;
            });
        }
    };
});

/*app.factory("roomService", function ($q, $http){
    var room = null;

    function getRoom(url){
        var defer = $q.defer();
        $http.get(url).success(function (data){
            room = data;
            defer.resolve();
        });
        return defer.promise;
    }

    return {
        getData: function() {return room}
    }
})*/