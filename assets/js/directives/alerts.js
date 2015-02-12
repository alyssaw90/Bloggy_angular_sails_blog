// <alerts></alerts>  <----- GOAL

myBlogApp.directive('alerts', function(){
  return {
    restrict: 'E',
    controller:['$scope', 'AlertService', function($scope,AlertService){
      $scope.getAlerts = function(){
        return AlertService.get()
      };
      //Splice on object out based on the index.
      $scope.closeAlert = function(idx){
        AlertService.remove(idx);
      }
    }],
    replace: true,
    template:'<alert ng-repeat="alert in getAlerts()" type="{{alert.type}}" close="closeAlert($index)">{{alert.text}}</alert>'
  }
});
