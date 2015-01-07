'use strict';

/* Services */

angular.module('myApp.services', [])

  .factory('User', ['$http', function($http) {
    return {
      loggedin: function() {
        return $http.get('/loggedin');
      },
      login: function(userData) {
        return $http.post('/login', userData);
      },
      logout: function() {
        return $http.post('/logout');
      }
    }
  }])

  // example data service
  .factory('Bears', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('/api/bears');
      },
      create: function(bearData) {
        return $http.post('/api/bears', bearData);
      },
      delete: function(id) {
        return $http.delete('/api/bears/' + id);
      }
    }
  }])

  .factory('Albums', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('/api/albums');
      },
      deletePhoto: function(albumName, photoPath) {
        return $http.put('/api/albums/' + albumName + '/' + photoPath);
      }
    }
  }]);