'use strict';

var myApp = angular.module('demoApp', [
		'ui.router',
		'config',
		'ngStorage',
		'ngMaterial'
	])
	.config(function ($httpProvider, $locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
	.run(function ($rootScope, ENV, CONFIG) {
		$rootScope.appConfig = CONFIG[ENV];

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			angular.element('html').addClass('ismobile');
		}

	})

	.factory('Comment', [function () {

		function Comment(text, created, user) {
			this.id = new Date().getTime();
			this.text = text;
			this.time = moment.unix(created).format("MM/DD/YYYY hh:mm");
			this.user = user;
			this.status = "published";
		}

		return Comment;
	}])

	.factory('Point', ['Comment', function (Comment) {

		function Point(x, y) {
			this.x = x;
			this.y = y;
			this.r = 30;
			this.show = 0;
			this.comments = [];
		}

		Point.prototype = {
			addComment: function (text) {
				var c = new Comment(text, Math.floor(Date.now() / 1000), "Who i am...");
				this.comments.push(c)
			},

			removeComment: function (comment) {
				this.comments = this.comments.filter(function (c) {
					return comment.id != c.id
				})
			},

			editComment: function (comment) {
				this.comments.filter(function (c) {
					return comment.id == c.id
				})[0].status = "edit"
			},

			saveComment: function (comment) {
				this.comments.filter(function (c) {
					return comment.id == c.id
				})[0].status = "published"
			},

			__toJSON: function () {
				return "";
			}
		};

		return Point;
	}])
	.directive("pointHTML", function($compile, $timeout) {
		return {
			templateUrl: '/themes/DemoApp/point.html',
			replace: false,
			controller: ['$scope', function($scope){
				$scope.comment = "";

				$scope.preAddComment = function () {
					$scope.point.addComment($scope.comment);
					$scope.comment = "";
				}
				
				$scope.preRemoveComment = function (comment) {
					$scope.point.removeComment(comment);
				}

				$scope.preEditComment = function (comment) {
					$scope.point.editComment(comment);
				}

				$scope.preSaveComment = function (comment) {
					$scope.point.saveComment(comment);
				}

				var originatorEv;
				$scope.openMenu = function($mdOpenMenu, ev) {
					originatorEv = ev;
					$mdOpenMenu(ev);
					
				};
			}]
		};
	})
	.controller('mainCtrl', ['$scope', '$localStorage', 'Point', function ($scope, $localStorage, Point) {
		$scope.points = [];
		$scope.handleClick = function (e) {
			var p = new Point(e.clientX, e.clientY);
			$scope.points.push(p);
		}

	}]);