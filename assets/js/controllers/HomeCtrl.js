myBlogApp.controller('HomeCtrl',['$scope','$http', '$modal', 'AlertService', '$location', 'UserService',function($scope,$http,$modal,AlertService,$location,UserService){

    $scope.posts = [];

    // console.log('search data: ' ,$location.search())

    var queryData = $location.search();
    var searchTerm = queryData.q || false;

    $scope.UserService = UserService;
    $scope.$watchCollection('UserService', function(){
        $scope.currentUser = UserService.currentUser
    });

    var req = {
        url:'/api/post',
        params:{
            'sort':'createdAt desc'
        }
    }

    if(searchTerm){
        req.params.body='%'+searchTerm+'%';
    }

    $http(req).success(function(data){
        $scope.posts = data;
    });

    $scope.deletePost = function(idx){
        var postId = $scope.posts[idx].id;
        $http.delete('/api/post/' + postId).success(function(data){
            $scope.posts.splice(idx,1);
        }).error(function(err){
            alert(err);
        })
    }

    $scope.editPost = function(idx){
        var postIdx = idx;
        $modal.open({
            templateUrl: '/views/post/editModal.html',
            controller: 'PostEditModalCtrl',
            resolve: {
                post: function(){
                    return $scope.posts[postIdx]
                }
            }
        // two params = function one for save one for close
    }).result.then(function(updatePost){
        console.log('modal saved', updatePost)
        $scope.posts[postIdx]=updatePost;
    },function(){
            //alert('modal closed with cancel')
        })
}

}]);
