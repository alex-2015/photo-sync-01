'use strict';

/* Services */

angular.module('myApp.services', [])

  .factory('User', ['$http', '$rootScope', function($http, $rootScope) {
    return {
      loggedin: function() {
        return $http.get($rootScope.baseUrl + '/loggedin');
      },
      login: function(userData) {
        return $http.post($rootScope.baseUrl + '/login', userData);
      },
      logout: function() {
        return $http.post($rootScope.baseUrl + '/logout');
      }
    }
  }])

  // example data service
  .factory('Bears', ['$http', '$rootScope', function($http, $rootScope) {
    return {
      get: function() {
        return $http.get($rootScope.baseUrl + '/api/bears');
      },
      create: function(bearData) {
        return $http.post($rootScope.baseUrl + '/api/bears', bearData);
      },
      delete: function(id) {
        return $http.delete($rootScope.baseUrl + '/api/bears/' + id);
      }
    }
  }]);