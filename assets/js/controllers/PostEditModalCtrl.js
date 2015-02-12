myBlogApp.controller('PostEditModalCtrl', ['$scope','$http','$modalInstance','post', 'AlertService', function($scope, $http, $modalInstance,post,AlertSerivce){

  $scope.title = post.title;
  $scope.body = post.body;


  $scope.save = function(){
    var postData = {
      title: $scope.title,
      body: $scope.body
    }
    $http.put('/api/post/'+post.id,postData)
    .success(function(data){
      AlertSerivce.add('success','The post has been added')
      $modalInstance.close(data)
    })
    .error(function(err){
      alert(err);
    });
  }

  $scope.cancel = function(){
    $modalInstance.dismiss();
  }

}]);
