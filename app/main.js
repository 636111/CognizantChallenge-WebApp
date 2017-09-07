'use strict';

angular
  .module('app', ['ngAnimate'])
  .controller('mainCtrl', ['$scope', 'rankingService', '$timeout', function($scope, rankingService, $timeout) {
    
    $scope.status;
    $scope.ranking;
    $scope.top;
    $scope.arrayRest = [];
    $scope.restSlide = 0;
    $scope.rest;
    
    (function getRanking() {
      rankingService.getRanking()
        .then(function(response) {
          response = testData; //test
          $scope.ranking = response.data;
          for (var i=0; i<$scope.ranking.length; i++) {
            $scope.ranking[i].position = getGetOrdinal(i+1);
          }
          getTop();
          updateRestView();
        }, function(error) {
          $scope.status = 'Unable to load ranking data: ' + error.message;
        });
      //call the API each 10 seconds
      $timeout(getRanking, 10000);
    }());

    function getTop() {
      var top = 3;
      $scope.top = $scope.ranking.slice(0,top);

      var size = 10-top;
      var restNum = 0;
      for (var i=0; i<$scope.ranking.slice(top,$scope.ranking.lenght).length; i++) {
        $scope.arrayRest[restNum] = $scope.ranking.slice(top,$scope.ranking.lenght).slice(i,i+size);
        restNum++;
        i+=size;
      }
    };

    function updateRestView() {
      $scope.rest = $scope.arrayRest[$scope.restSlide];
      $scope.restSlide = $scope.restSlide + 1 < $scope.arrayRest.length ? $scope.restSlide + 1 : 0;
    };

    function getGetOrdinal(n) {
      var s=["th","st","nd","rd"],
          v=n%100;
      return n+(s[(v-20)%10]||s[v]||s[0]);
    };

    var testData = {
      data: [
        {
          "tryAgain":false,
          "mail":"juna@gmail.com",
          "id":2,
          "score":999,
          "nick":"Juan"
        },{
          "tryAgain":false,
          "mail":"pawel@gmail.com",
          "id":1,
          "score":500,
          "nick":"pawel"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":200,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"juna@gmail.com",
          "id":2,
          "score":100,
          "nick":"Juan"
        },{
          "tryAgain":false,
          "mail":"pawel@gmail.com",
          "id":1,
          "score":90,
          "nick":"pawel"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":80,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"juna@gmail.com",
          "id":2,
          "score":70,
          "nick":"Juan"
        },{
          "tryAgain":false,
          "mail":"pawel@gmail.com",
          "id":1,
          "score":60,
          "nick":"pawel"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":50,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"juna@gmail.com",
          "id":2,
          "score":40,
          "nick":"Juan"
        },{
          "tryAgain":false,
          "mail":"pawel@gmail.com",
          "id":1,
          "score":30,
          "nick":"pawel"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":20,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":10,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":9,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":8,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":7,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":6,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":5,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":4,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":3,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":2,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":1,
          "nick":"Vicente"
        },{
          "tryAgain":false,
          "mail":"Vicente@gmail.com",
          "id":3,
          "score":1,
          "nick":"Vicente"
        }
      ]
    };

  }])
  .factory('rankingService', ['$http', function($http) {
    
    var urlBase = "https://cognizantchallenge.herokuapp.com/score",
        token = '',
        rankingData = {};

    rankingData.getRanking = function(){
      console.log("call to API");
      return $http.get(urlBase+'?access_token='+token);
    };

    return rankingData;
  }]);
