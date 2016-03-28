var configData = {
    'ENV': 'PROD',
    'APP_NAME': 'My App',
    'APP_VERSION': '0.1',
    'CONFIG': {
        'PROD': {
            'THEME': 'DemoApp'
        },
        'DEV': {
            'THEME': 'DemoApp'
        }
    }
};

var configModule = angular.module('config', []);
angular.forEach(configData, function(key, value) {
    configModule.constant(value, key);
});