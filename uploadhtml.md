<!doctype html>
<html lang="en">
<link rel="stylesheet" type="text/css" href="css/test.css">

<head>
  <meta charset="UTF-8">
  <title>Example - example-input-directive-production</title>
</head>

<body ng-app="inputExample">
  <div ng-controller="ExampleController">
    <form name="myForm">


      name:
      <input type="text" ng-model="user.name">
      <br>category:
      <input type="text" ng-model="user.category">
      <br>numbers:
      <input type="number" ng-model="user.numbers">
      <br>productName:
      <input type="text" ng-model="user.productName">
      <br>productIntroduction:
      <input type="text" ng-model="user.productIntroduction">
      <br>productDetail:
      <input type="text" ng-model="user.productDetail">
      <br>timeLimit:
      <input type="text" ng-model="user.timeLimit">
      <br>image:
      <input ng-change="abc()" type='file' ng-model='image' base-sixty-four-input>



    </form>
    <button ng-click="sendJson()">sendJson</button>
    <hr>
    <tt id="jsonDiv">{{user}}</tt>
    <br/>
  </div>
</body>
<script src="js/angular.js"></script>
<script src="js/angular-base64-upload.js"></script>
<script>
  angular.module('inputExample', ['naif.base64'])
    .controller('ExampleController', function ($scope, $http) {
      $scope.user = {};
      $scope.image = {};

      $scope.uploadme = {};
      $scope.uploadme.src = "";
      $scope.abc = function () {
        $scope.user.image = "data:" + $scope.image.filetype + ";base64," + $scope.image.base64;
        console.log($scope.user)
      }

      $scope.sendJson = function () {
        $http.post("http://www.hahadz.com:3000/api/posts", $scope.user).success(function (data) {
          console.log(data)
          alert("successfully pushed")
        })
      }
    });
</script>

</html>
