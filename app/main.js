'use strict';

angular
  .module('app', ['ngAnimate'])
  .controller('mainCtrl', ['$scope', 'rankingService', '$timeout', function($scope, rankingService, $timeout) {
    
    $scope.status;
    $scope.ranking;
    $scope.rankingLength = 0;
    $scope.top;
    $scope.arrayRest = [];
    $scope.restSlide = 0;
    $scope.rest = 0;

    $scope.slide;
    
    (function getRanking() {
      rankingService.getRanking()
        .then(function(response) {
          $scope.ranking = response.data;
          $scope.rankingLength = $scope.ranking.length;
          for (var i=0; i<$scope.ranking.length; i++) {
            $scope.ranking[i].score = $scope.ranking[i].score + ' pts';
            $scope.ranking[i].position = getGetOrdinal(i+1);
          }

          getTop();
          updateRestView();
          
          $scope.slide = $scope.slide + 1 < 4 ? $scope.slide + 1 : 1;

        }, function(error) {
          $scope.status = 'Unable to load ranking data: ' + error.message;
        });
      //call the API each 10 seconds
      $timeout(getRanking, 10000);
    }());

    function getTop() {
      var top = 3;
      $scope.top = $scope.ranking.slice(0,top);
      if ($scope.top.length < top) {
        if ($scope.top.length < 1) {
          $scope.top = [];
          for (var i=0; i<top; i++) {
            $scope.top[i] = {};
          }
        } else {
          for (var i=$scope.top.length; i<top; i++) {
            $scope.top[i] = {};
          }
        }
      }
      
      var size = 10-top;
      var restNum = 0;
      if ($scope.ranking.slice(top,$scope.ranking.lenght).length < 1) {
        $scope.arrayRest[0] = [];
        for (var i=0; i<size; i++) {
          $scope.arrayRest[0][i] = {};
        }
      }
      for (var i=0; i<$scope.ranking.slice(top,$scope.ranking.lenght).length; i++) {
        
        $scope.arrayRest[restNum] = $scope.ranking.slice(top,$scope.ranking.lenght).slice(i,i+size);
        if ($scope.arrayRest[restNum].length<size) {
          for (var j=$scope.arrayRest[restNum].length; j<size; j++) {
            $scope.arrayRest[restNum][j] = {};
          }
        }
        restNum++;
        i+=size-1;
      }
    };

    function updateRestView() {
      $scope.rest = $scope.arrayRest[$scope.restSlide];
      $scope.restSlide = $scope.restSlide + 1 < $scope.arrayRest.length ? $scope.restSlide + 1 : 0;
    };

    function getGetOrdinal(n) {
      var s=["ro","do","to","mo","vo","no"],
          v=n%10;

      //var s=["th","st","nd","rd"],
      //    v=n%100;
      //return n+(s[(v-20)%10]||s[v]||s[0]);

      /*
      if (n==11 || n==12)
        return n+s[3];
      else {
        if (v==1 || v==3)
          return n+s[0];
        else if (v==2)
          return n+s[1];
        else if (v==4 || v==5 || v==6)
          return n+s[2];
        else if (v==7 || v==0)
          return n+s[3];
        else if (v==8)
          return n+s[4];
        else if (v==9)
          return n+s[5];
      }
      */

      return n+'.º';

    };

  }])
  .factory('rankingService', ['$http', function($http) {
    
    var urlBase = "https://cognizantchallenge.herokuapp.com/score",
        rankingData = {},
        token = "Token: LAv49uXbmOoCUm162SQxHJI3Il0jHCqmmA31I40RZIw==";

    $http.defaults.headers.common['Authorization'] = token;

    rankingData.getRanking = function(){
      return $http.get(urlBase);
    };

    return rankingData;
  }]);
