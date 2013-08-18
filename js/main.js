var dssApp = angular.module('dssApp', []);


// catchRequirements controller
dssApp.controller('catchRequirements', function ($scope, $http) {
  $http.defaults.headers.common.Authorization = 'Basic YWRtaW4=:YWRtaW4='; // <== base64 encoded admin:admin 

  $http.jsonp('http://localhost:2480/cluster/functional/Requirements?callback=DisplayFuncCtrl');
});

// Get First level Requirements
// dss.controller("RequirementsCtrl", function($scope, $http) {
//  $http.defaults.headers.common.Authorization = 'Basic ' + 'YWRtaW4=:YWRtaW4='; // <== base64 encoded admin:admin 

//  $http.jsonp('http://localhost:2480/cluster/functional/Requirements?callback=DisplayFunc');

// });
//

function DisplayFuncCtrl(data) {
  console.log(data['result']);
}


