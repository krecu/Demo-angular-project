myApp
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/themes/DemoApp/home.html'
			})
	});