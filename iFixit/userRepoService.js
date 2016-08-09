(function(){
    var userRepoService = function($http){
      var getUsers = function(username){
            return $http.get("https://www.ifixit.com/api/2.0/categories")
                        .then(function(response){
                           return response.data; 
                        });
      };
      return {
          get: getUsers
      };
    };
    var module = angular.module("postExample");
    module.factory("userRepoService", userRepoService);
}());