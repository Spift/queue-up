
var app = angular.module('app.directives', []);


app.directive('teachersPetTabBar', function(){
	var logScope = function(scope, element, attrs) {
		console.log("scope.page is", scope.template);
	}
	return {
		scope: {
			page: '@',
			template: '@',
		},
		template: '<div ng-include="template"></div>',
		link: logScope,
	};
});


/* maybe go back to using two separate directives because the dynamic template used above loads slowly for me?
app.directive('studentTab', function(){
	var logScope = function(scope, element, attrs) {
		console.log("scope.page is", scope.page);
	}
	return {
		scope: {
			page: '@',
			test: '='
		},
		templateUrl: 'templates/studentTab.html',
		link: logScope,
	};
});

app.directive('teacherTab', function(){
	return {
		restrict: 'E',
		scope: {currentPage: '@currentPage'},
		templateUrl: 'templates/teacherTab.html',
	};
});
*/