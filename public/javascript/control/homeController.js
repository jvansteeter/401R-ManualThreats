'use strict';

var clientApp = angular.module('clientApp');

var post = {};

clientApp.controller('homeController', function($scope, $window, $http)
{
	$scope.init = function()
	{
		$http.get("api/post").then(function(response)
		{
			if (response.data.length != 0)
			{
				post = response;
				var raw = bin2String(response.data[0].post.data);
				var json = JSON.parse(raw);
				$scope.post = json;
			}
			else
			{
				post = null;
				$scope.post = "";
			}
		})
	};

	$scope.threat = function()
	{
		if (post === null)
		{
			return;
		}
		$http.post('api/threat', {uuid: post.data[0].uuid}).success(function()
		{
			$scope.init();
		})
	};

	$scope.nothreat = function()
	{
		if (post === null)
		{
			return;
		}
		$http.post('api/nothreat', {uuid: post.data[0].uuid}).success(function()
		{
			$scope.init();
		})
	};
});

function bin2String(array) {
	var result = "";
	for (var i = 0; i < array.length; i++) {
		result += String.fromCharCode(parseInt(array[i], 10));
	}
	return result;
}