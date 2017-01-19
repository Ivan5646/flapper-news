angular.module('flapperNews', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });
    $urlRouterProvider.otherwise('home');
}])

.factory('posts', [function(){ 
  var o = {
    posts: []
  };
  return o;
}])

.controller('MainCtrl', ['$scope', 'posts', // posts is a factory
  function($scope, posts){
    $scope.posts = posts.posts; // Bind the $scope.posts variable in our controller to the posts array in our service

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; } // prevents blank field submtting
      $scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0, comments:[
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}]
  }); // $scope.title allows to get user's input
      $scope.title = ''; // clears the input
      $scope.link = ''; // clears the link input
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }
])
.controller('PostsCtrl', ['$scope','$stateParams','posts',
  function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
      if($scope.body === '') { return; }
      $scope.post.comments.push({body: $scope.body, author: 'user', upvotes: 0});
      $scope.body = '';
    };
  }
]);





