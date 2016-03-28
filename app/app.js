/**
 * global application
 */
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
		/**
		 * feature implement configure app
		 */
		$rootScope.appConfig = CONFIG[ENV];

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			angular.element('html').addClass('ismobile');
		}

	});