'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('AppCtrl', function($scope, $http, User, Albums) {
    $http.get('data.json').success(function(data){
      $scope.data = data;
      $scope.toggleModal = function(album, index) {
        $scope.data[album][index].modal = !$scope.data[album][index].modal;
      }
    });
    // Albums.get()
    //   .success(function(data) {
    //     $scope.albums = data;
    //   });
    $scope.logout = function() {
      User.logout();
    }
    $scope.includes = {
      header: 'partials/header.html'
    }
    $scope.mobileMenu = {
      on: true,
      open: false
    }
    $scope.mobileToggle = function(toggle) {
      if(toggle == 'off') {
        $scope.mobileMenu.open = false;
      } else {
        $scope.mobileMenu.open = !$scope.mobileMenu.open;
      }
    }
  })


  .controller('HomeCtrl', function($scope, $http) {

  })

  .controller('LoginCtrl', function($scope, $location, User) {
    $scope.user = {};
    $scope.login = function(){
      if($scope.user) {
        User.login($scope.user)
          .success(function(data) {
            $location.url('/admin');
          })
          .error(function() {
            $location.url('/login');
          });
      }
    }
  })

  .controller('AdminCtrl', function($scope, Albums) {
    // $scope.deletePhoto = function(albumName, photoPath) {
    //   Albums.put(albumName, photoPath)
    //     .success(function(data) {
    //       Albums.get()
    //         .success(function(data) {
    //           $scope.albums = data;
    //         });
    //       console.log('Photo removed');
    //     });
    // }
  })

  .controller('StoryCtrl', function($scope) {
  })

  .controller('DetailsCtrl', function($scope) {
  })

  .controller('PhotosCtrl', function($scope) {
    
  });