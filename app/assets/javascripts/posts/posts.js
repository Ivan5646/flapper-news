angular.module('flapperNews').factory('posts', ['$http', function(){ 
  var o = {
    posts: []
  };
  return o;
}]);