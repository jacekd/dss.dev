var dss = angular.module('dss', []);

// Config
// dss.config(['$httpProvider', function($httpProvider) {
//  $httpProvider.defaults.useXDomain = true;
//  delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);

// Catch data
function catchRequirements($scope, $http) {
  $http.defaults.headers.common.Authorization = 'Basic YWRtaW4=:YWRtaW4='; // <== base64 encoded admin:admin 

  $http.jsonp('http://localhost:2480/cluster/functional/Requirements?callback=DisplayFuncCtrl');
}

// Get First level Requirements
// dss.controller("RequirementsCtrl", function($scope, $http) {
//  $http.defaults.headers.common.Authorization = 'Basic ' + 'YWRtaW4=:YWRtaW4='; // <== base64 encoded admin:admin 

//  $http.jsonp('http://localhost:2480/cluster/functional/Requirements?callback=DisplayFunc');

// });
//

function DisplayFuncCtrl($scope) {
  console.log($scope);
}


