var app = angular.module('app.directives', [])

app.directive('studentTab', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/studentTab.html'
	};
});

app.directive('teacherTab', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/teacherTab.html'
	};
});
