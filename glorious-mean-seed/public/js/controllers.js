'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('AppCtrl', function($scope, User, Bears) {

    $scope.logout = function() {
      User.logout();
    }

    // example data GET
    Bears.get()
      .success(function(data) {
        $scope.bears = data;
      });

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

  .controller('AdminCtrl', function($scope, Bears) {

    // example form data model
    $scope.formData = {};

    // example data POST
    $scope.submit = function() {
      if($scope.formData) {
        Bears.create($scope.formData)
          .success(function(data) {
            $scope.formData = {};
            Bears.get()
              .success(function(data) {
                $scope.bears = data;
              });
          });
      }
    }

    // example data DELETE
    $scope.delete = function(id) {
      Bears.delete(id)
        .success(function(data) {
          Bears.get()
              .success(function(data) {
                $scope.bears = data;
              });
          console.log('Goodbye bear ' + id);
        });
    }

  });