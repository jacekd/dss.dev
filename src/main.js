var dssApp = angular.module('dssApp', []);

// Globals
var functionalDatabaseUrl = "http://localhost:2480/functional";

// dssApp.config(['$httpProvider', function($httpProvider) {
//   
//   $httpProvider.defaults.useXDomain = true;
//   delete $httpProvider.defaults.headers.common['X-Requirements-With'];
// 
// }]);
// 
// // catchRequirements factory
// dssApp.factory('catchRequirementsFactory', function ($http) {
//   $http.defaults.headers.common.Authorization = 'Basic YWRtaW4=:YWRtaW4='; // <== base64 encoded admin:admin
// //
//   var config = {headers: {
//     'Authorization': 'Basic YWRtaW4=:YWRtaW4=',
// //    'Access-Control-Allow-Origin': 'dss.dev',
//     'withCredentials': true,
//  //   'Accept': 'application/json;odata=verbose'
//   }};
// 
//   var factory = {};
//   factory.getAll = function () {
//    return $http.get('http://localhost:2480/cluster/functional/Requirements');
//   }
// 
//   return factory;
// });
// 
// dssApp.controller('firstLevelRequirements', function($scope, catchRequirementsFactory) {
//   $scope.requirements = catchRequirementsFactory.getAll();
//   console.log($scope.requirements);
// });

//var database = new ODatabase('http://localhost:2480/functional');
//databaseInfo = database.open('admin', 'admin');
//queryResults = database.query('select from Requirements where level = 1');
//
//console.log(queryResults['result']);
//
// ---------------------------------------------------------------
// catchRequirements factory
dssApp.factory('catchRequirementsFactory', function (){
  // Initialize database and methods 
  var methods = {},
      functionalDatabase = new ODatabase(functionalDatabaseUrl),
      functionalDatabaseInfo = functionalDatabase.open('admin', 'admin');

  methods.getAll = function () {
    query = functionalDatabase.query('select from Requirements');

    return query.result;
  }

  methods.getFirstLevelRequirements = function () {
    query = functionalDatabase.query('select from Requirements where level = 1');

    return query.result;
  }

  methods.getThirdLevelRequirements = function () {
    query = functionalDatabase.query('select from Requirements where level = 3');

    return query.result;
  }

  functionalDatabase.close();
  return methods;
});

// test controller
dssApp.controller('firstLevelRequirements', function($scope, catchRequirementsFactory) {
  $scope.requirements = catchRequirementsFactory.getFirstLevelRequirements();
});
