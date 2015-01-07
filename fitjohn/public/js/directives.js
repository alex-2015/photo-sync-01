'use strict';

/* Directives */

angular.module('myApp.directives', [])

  // check z-index of mobilecheck class to determine the size of the viewport
  .directive("mobileCheck", function() {
    return {
      link: function (scope, element, attrs) {
        scope.getZIndex = function() {
          return window.getComputedStyle(element[0]).getPropertyValue('z-index');
        }
        scope.$watch(scope.getZIndex, function(newValue, oldValue) {
          if(newValue != 1 && scope.mobileMenu.open){
            scope.mobileToggle();
          }
        });
        window.onresize = function(){
          scope.$apply();
        }
      }
    }
  })

  .directive('resize', function ($window) {
		return function (scope, element) {
			var w = angular.element($window);
			var head = angular.element('#head');
			scope.$watch(function () {
				return { 'h': w.height(), 'w': w.width() };
			}, function (newValue, oldValue) {
				scope.windowHeight = newValue.h - head.outerHeight();
	      // scope.windowWidth = newValue.w;
	   //    scope.style = function () {
				// 	return { 
	   //        'height': (newValue.h - 100) + 'px',
	   //        'width': (newValue.w - 100) + 'px' 
	   //      };
				// };
			}, true);
			w.bind('resize', function () {
				scope.$apply();
			});
		}
	});