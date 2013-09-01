
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
dssApp.directive('render', function() {
  return function (scope, element, attrs) {
    attrs.$observe('parameters', function(value) {
      var attributes = scope.$eval("{" + attrs.parameters + "}"),
          renderValue = attrs.render;
      if (renderValue === "slider") {
        return {
          restrict: 'A',
          link: 
            element.noUiSlider({
              range: attributes.range===null||attributes.range===undefined ? [0,100] : attributes.range,
              start: attributes.start===null||attributes.start===undefined ? 0 : attributes.start,
              step: attributes.step===null||attributes.start===undefined ? 1 : attributes.step,
              handles: attributes.handles===null||attributes.handles===undefined ? 1 : attributes.handles,
              slide: function() {
                $(this).prev("span.requirementValue").text($(this).val());
              }
            })
        }
      } else if (renderValue === "select") {
        return {
          restrict: 'E',
          scope: {
            render: '='
          },
          template: "<h5>there will be select here</h5>",
          replace: true
        }
      } else if (renderValue === "input") {
        return {
          restrict: 'E',
          template: '',
          replace: true
        }
      } else if (renderValue === "checkbox") {
        return {
          restrict: 'E',
          template: '',
          replace: true
        }
      }

    });
  }
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
  //
  $scope.queryElements = [];

  $scope.requirements = catchRequirementsFactory.getAll();

  $scope.showSubcategory = function(categoryName) {
    // Initialize foundation
    $(document).foundation();

    $(".thirdLevelRequirements").hide();
    $("#" + categoryName).fadeIn();
  }

  $scope.closeSubcategory = function(className) {
    $("." + className).fadeOut();
  }

  $scope.addElementToQuery = function(categoryName) {
    var requirementName = $("select." + categoryName).val();

    angular.forEach($scope.requirements, function(requirement) {
      if (requirement.category === categoryName && requirement.name === requirementName) {
          if ($scope.queryElements.indexOf(requirement) == -1) $scope.queryElements.push(requirement);
      }
    });
  }

  // Initialize foundation
  $(document).foundation();
});

