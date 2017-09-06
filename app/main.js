'use strict';

angular
  .module('app', [])
  .controller('mainCtrl', ['$scope', 'rankingService', function($scope, rankingService) {
    
    $scope.status;
    $scope.ranking;

    (function getRanking() {
      rankingService.getRanking()
        .then(function(response) {
          response = testData; //test
          $scope.ranking = response.data;
          //console.log(JSON.stringify($scope.ranking));
        }, function(error) {
          $scope.status = 'Unable to load ranking data: ' + error.message;
        });
      //call the API each 10 seconds
      setTimeout(getRanking, 10000);
    }());

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
