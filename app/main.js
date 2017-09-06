'use strict';

angular
  .module('app', [])
  .controller('mainCtrl', ['$scope', 'rankingService', function($scope, rankingService) {
    
    $scope.status;
    $scope.ranking;
    getRanking();
    
    function getRanking() {
      rankingService.getRanking()
        .then(function(response) {
          $scope.ranking = response.data;
          console.log(JSON.stringify($scope.ranking));
        }, function(error) {
          $scope.status = 'Unable to load ranking data: ' + error.message;
        });
    };

  }])
  .factory('rankingService', ['$http', function($http) {
    
    var urlBase = "https://cognizantchallenge.herokuapp.com/score",
        token = '',
        rankingData = {};
    
    rankingData.getRanking = function(){
      return $http.get(urlBase+'?access_token='+token);
    };

    return rankingData;
  }]);
