
// Initialize Angular
var dssApp = angular.module('dssApp', []);

// Globals
var functionalDatabaseUrl = "http://localhost:2480/functional";

// ---------------------------------------------------------------
// catchRequirements factory
dssApp.factory('catchRequirementsFactory', function (){
  // Initialize database and methods 
  var methods = {},
      functionalDatabase = new ODatabase(functionalDatabaseUrl),
      functionalDatabaseInfo = functionalDatabase.open('admin', 'admin');

  methods.getAll = function () {
    query = functionalDatabase.query('select from Requirements', 1000);

    return query.result;
  }

  functionalDatabase.close();
  return methods;
});

// Directives 
dssApp.directive('slider', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe('slider', function(value) {
        var attributes = scope.$eval("{" + attrs.slider + "}");

        element.noUiSlider({
          range: attributes.range===null||attributes.range===undefined ? [0,100] : attributes.range,
          start: attributes.start===null||attributes.start===undefined ? 0 : attributes.start,
          step: attributes.step===null||attributes.start===undefined ? 1 : attributes.step,
          handles: attributes.handles===null||attributes.handles===undefined ? 1 : attributes.handles,
          slide: function() {
            $(this).prev("span.requirementValue").text($(this).val());
          }
        });
      });
    }
  };
});

// Filters
dssApp.filter('capitalize', function() {
  return function(input, scope) {
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

dssApp.filter('replaceSpacesWithDash', function() {
  return function(input, scope) {
    return input.replace(/ /g,"_");
  }
});

// first Level Requirements controller
dssApp.controller('requirements', function($scope, catchRequirementsFactory) {
  // $scope.requirementsFirstLevel = catchRequirementsFactory.getFirstLevelRequirements();
  $scope.filterCategory = {  };

  $scope.requirements = catchRequirementsFactory.getAll();

  $scope.showSubcategory = function(categoryName) {
    // Initialize foundation
    $(document).foundation();

    $(".thirdLevelRequirements").hide();
    $("#" + categoryName).fadeIn();
  }

  $scope.closeSubcategory = function(className) {
    $("." + className).fadeOut();

  $scope.addElementToQuery = function() {
    var requirementName = $(this).parent().parent().find("select").val();
    console.log($(this));
  }
  }

  // Initialize foundation
  $(document).foundation();
});

