myBlogApp.factory('UserService',['$http',function($http){

  return {
    login:function(email, password, callback){

      var self = this;
      var loginData={email:email,password:password}

      $http.post('/api/auth', loginData)
      .success(function(data){
        if(data && data.user){
          //Login success
          self.currentUser = data.user;
        }else{
          //Login failure
          self.currentUser = false;
        }
        callback(null,data)
      }).error(function(err){
        callback(err)
      })
    },
    logout:function(callback){
      var self = this;
      $http.delete('/api/auth')
      .success(function(data){
        self.currentUser = false;
        callback(null,data);
      }).error(function(err){
        callback(err);
      })
    },
    check:function(callback){ //Check to see if user is still logged in.
      var self = this;
      $http.get('/api/auth')
      .success(function(data){
        if(data && data.user){
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null,data)
      }).error(function(err){
        callback(err);
      })
    }
  }

}]);
