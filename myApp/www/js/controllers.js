angular.module('starter.controllers', [])

    .controller('CouponCtrl', function ($scope, localStorageService, types) {
        $scope.items = types.allItems();

    })

    .controller('typesCtrl', function ($scope, types) {
        $scope.types = types.all();
    })

    .controller('typeDetailCtrl', function ($scope, $stateParams, types) {
        $scope.type = types.get($stateParams.typeId);
    })

    .controller('CouponDetailCtrl', function ($scope, $stateParams, localStorageService, types, $http) {

        $scope.types = types.all();
        $scope.items = types.allItems();
        $scope.checked = types.favoriteList();
console.log("stateParams are");
        console.log($stateParams)
        $scope.coupon = types.fetch($stateParams.couponId);
        $scope.favorites = "button icon-left ion-plus button-positive";
        $scope.favoritesText = "点击领取";
        console.log(localStorageService.get("checkedData"));
        console.log($scope.checked);
        if (localStorageService.get("checkedData")) {
            $scope.checked = localStorageService.get("checkedData")
        }
        $scope.favoriteClass = function () {
            var exist = false;
            angular.forEach($scope.checked, function (value) {
                if (value.id == $scope.coupon.id) {
                    exist = true;
                }
            });
            if (exist) {
                $scope.favorites = "button icon-left ion-heart button-positive";
                $scope.favoritesText = "已经领取";
            }
        };

        $scope.changeClass = function () {
            var couponId = $scope.coupon.id
                if ($scope.favoritesText === "点击领取") {
                    var notExist = true;
                    angular.forEach($scope.checked, function (value) {
                        if (value.id == $scope.coupon.id) {
                            notExist = false;
                        }
                    });
                    if (notExist) {
                        $http.post("http://hahadz.com:3000/api/add", {
                            "couponId": couponId
                        }).success(function (data) {
                            if (data === "couldn't find") {
                                alert("库存不足,无法领取！");
                                $scope.favoritesText = "无法领取";
                            }
                            else {
                                alert("found");
                                $scope.favoritesText = "已经领取";
                                $scope.favorites = "button icon-left ion-heart button-positive";
                                console.log($scope.items[couponId].numbers--)
                                pushSet($scope.checked.push($scope.coupon));
                            }
                        });

                        //delete $scope.items[$scope.coupon.id];
                        console.log($scope.items);
                        function pushSet(){
                        localStorageService.set("checkedData", $scope.checked);
                        }
                        console.log("this is" + $scope.checked)
                    }
                    var newChecked = angular.copy($scope.checked);
                    $scope.checked = newChecked;
                    console.log(newChecked)
                }
        }
    })

    .controller('favoriteListCtrl', function ($scope, $stateParams, localStorageService, types) {

        $scope.types = types.all();
        $scope.items = types.allItems();
        $scope.coupon = types.fetch($stateParams.couponId);
        $scope.checked = types.favoriteList();
        $scope.theChecked = [];
        $scope.favorites = "button icon-left ion-plus button-positive";
        $scope.favoritesText = "点击领取";

        var flag;
        if (localStorageService.get("checkedData")) {


            $scope.checked = localStorageService.get("checkedData")

        }
        console.log($scope.checked)
        console.log(localStorageService.get("checkedData"));

        console.log($scope.checked)
        console.log(localStorageService.set("checkedData",$scope.checked));

        angular.forEach( $scope.checked,function(value,key) {
            console.log(key)
            console.log(value.id)
            console.log($scope.items[key])
            if($scope.items[value.id]){
                $scope.theChecked.push(angular.copy($scope.items[key]))
                localStorageService.set("checkedData",$scope.theChecked);
                console.log($scope.checked)
            }
        })
    })

    .controller('favoriteDetailCtrl', function ($scope, $stateParams,localStorageService, types, $http) {
console.log(parseInt($stateParams.favoriteId))
        $scope.checked = localStorageService.get("checkedData")
console.log($scope.checked)
        $scope.items = types.allItems();

        $scope.favoriteCoupon = $scope.items[parseInt($stateParams.favoriteId)];
        console.log("favoriteCoupon is")
        console.log($stateParams)
        $scope.checked = types.favoriteList();
        $scope.favorites = "button icon-left ion-plus button-positive";
        $scope.favoritesText = "点击领取";
        $scope.changeClass = function () {
            if ($scope.favorites === "button icon-left ion-plus button-positive") {
                $scope.favorites = "button icon-left ion-heart button-positive";
                if ($scope.favoritesText === "点击领取")
                    $scope.favoritesText = "已经领取";
            }
        };
    })
    .controller('MenuCtrl', function ($scope, types, $http, $ionicSideMenuDelegate, localStorageService, $location) {
        $scope.register = function (username, password) {
            $http.post("http://hahadz.com:3000/api/user", {
                "username": username,
                "password": password
            }).success(function (data) {
                if (data === "already registered") {
                    alert("用户名已经注册，请换用户名！");
                }
                else {
                    alert("注册成功！");
                    $location.path('#/tab/coupon');
                    localStorageService.set("usernameDate", data);
                    console.log(localStorageService.get("usernameDate") + "is nice")

                }
            });
        };
    })
    .controller('MyCtrl', function ($scope, types, $http, localStorageService,$state) {
        $scope.doRefresh = function () {

            /*  $http.get("http://hahadz.com:3000/api/posts").success(function (data) {
             console.log(data )
             $scope.items = data;
             localStorageService.set("itemsData", data)
             })
             .finally(function () {
             $scope.$broadcast('scroll.refreshComplete')
             });*/
            reloadBroad($state.reload())
            function reloadBroad() {
                $scope.$broadcast('scroll.refreshComplete')
            }
        }
        $scope.$on('myService:getUserConfigSuccess', function () {
            $scope.currentTime = new Date();
            $scope.items = types.allItems();
            if (localStorageService.get("checkedData")) {
                $scope.checked = localStorageService.get("checkedData")
            }
        });
        $scope.currentTime = new Date();


        angular.forEach($scope.checked, function (value) {
            console.log($scope.items.indexOf(value))
        });
        if (localStorageService.get("checkedData")) {
            $scope.checked = localStorageService.get("checkedData")
        }

    });