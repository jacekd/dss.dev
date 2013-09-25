// Generated by CoffeeScript 1.6.3
(function() {
  var csdDatabaseUrl, dssApp, functionalDatabaseUrl;

  dssApp = angular.module('dssApp', []);

  functionalDatabaseUrl = "http://localhost:2480/functional";

  csdDatabaseUrl = "http://localhost:2480/csd";

  dssApp.factory('dataFactory', function() {
    var csdDatabase, csdDatabaseInfo, methods;
    csdDatabase = new ODatabase(csdDatabaseUrl);
    csdDatabaseInfo = csdDatabase.open('admin', 'admin');
    methods = {};
    methods.getAllRequirements = function() {
      var query;
      query = csdDatabase.query('select from Requirements', 1000);
      return query.result;
    };
    methods.catchMatching = function(query) {
      query = csdDatabase.query(query, 30);
      return query.result;
    };
    csdDatabase.close();
    return methods;
  });

  dssApp.filter('capitalize', function() {
    return function(input, scope) {
      return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
  });

  dssApp.filter('replaceSpacesWithDash', function() {
    return function(input, scope) {
      return input.replace(/\ /g, "_");
    };
  });

  dssApp.filter('replaceDotWithDash', function() {
    return function(input, scope) {
      return input.replace(/\./g, "_");
    };
  });

  dssApp.filter('replaceDashWithSpace', function() {
    return function(input, scope) {
      return input.replace(/_/g, " ");
    };
  });

  dssApp.filter('replaceDashWithDot', function() {
    return function(input, scope) {
      return input.replace(/_/g, ".");
    };
  });

  dssApp.filter('unique', function() {
    return function(items, filterOn) {
      var extractValueToCompare, hashcheck, newItems;
      if (filterOn === false) {
        return items;
      }
      if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
        hashcheck = {};
        newItems = [];
        extractValueToCompare = function(item) {
          if (angular.isObject(item) && angular.isString(filterOn)) {
            return item[filterOn];
          } else {
            return item;
          }
        };
        angular.forEach(items, function(item) {
          var isDuplicate, newItem, _i, _len;
          isDuplicate = false;
          for (_i = 0, _len = newItems.length; _i < _len; _i++) {
            newItem = newItems[_i];
            if (angular.equals(extractValueToCompare(newItem), extractValueToCompare(item))) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            newItems.push(item);
          }
          items = newItems;
        });
      }
      return items;
    };
  });

  dssApp.directive('render', function() {
    return function(scope, element, attrs) {
      return attrs.$observe('parameters', function(value) {
        var attributes, options, renderValue;
        attributes = scope.$eval("{" + attrs.parameters + "}");
        renderValue = attrs.render;
        if (renderValue === "slider") {
          return {
            restrict: 'A',
            link: element.noUiSlider({
              range: attributes.range || [0, 100],
              start: attributes.start || 0,
              step: attributes.step || 1,
              handles: attributes.handles || 1,
              slide: function() {
                return $(this).prev("span.requirementValue").text($(this).val());
              }
            })
          };
        } else if (renderValue === "select") {
          options = '<option value="none">-- select --</option>';
          angular.forEach(attributes, function(value, key) {
            options = options + '<option value="' + key + '">' + value + '</option>';
          });
          return {
            restrict: 'E',
            replace: true,
            template: element.html('<label for="' + element.text() + '">' + element.text() + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><select name="' + element.text() + '">' + options + '</select>')
          };
        } else if (renderValue === "input") {
          return {
            restrict: 'E',
            replace: true,
            template: element.html('<label for="' + element.text() + '">' + element.text() + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><input name="' + element.text() + '" type=' + attributes.type + ' class="large-12 columns" ng-model="' + element.text() + '" ng-change="change()">')
          };
        } else if (renderValue === "radio") {
          return {
            restrict: 'E',
            replace: true,
            template: element.html('<label for="' + element.text() + '">' + element.text() + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><div class="switch small"><input id="z" name="' + element.text() + '" type="radio" checked><label for="z" onclick="">NO</label><input id="z1" name="' + element.text() + '" type="radio"><label for="z1" onclick="">YES</label><span></span></div>')
          };
        } else {
          console.log('ouch');
        }
        $(document).foundation();
      });
    };
  });

  dssApp.directive('reqInput', function() {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs) {
        var attributes, placeholder, type;
        attributes = scope.$eval("{" + scope.item.attributes + "}");
        placeholder = attributes.placeholder || "";
        type = attributes.type || "text";
        element.html('<label for="' + scope.item.name + '">' + scope.item.name + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><input name="' + scope.item.linkName + '" type="' + type + '" class="large-12 columns query" placeholder="' + placeholder + '">');
        return element.bind('change', function() {
          return scope.change();
        });
      }
    };
  });

  dssApp.directive('reqRadio', function() {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs) {
        var attributes;
        attributes = scope.$eval("{" + scope.item.attributes + "}");
        element.html('<label for="' + scope.item.name + '">' + scope.item.name + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><div class="switch small radius\
      query" name="' + scope.item.linkName + '"><input id="0" name="' + scope.item.name + '" type="radio" checked><label for="z" onclick="">' + attributes[0] + '</label><input id="1" name="' + scope.item.name + '" type="radio"><label for="z1" onclick="">' + attributes[1] + '</label><span></span></div>');
        return element.bind('click', function() {
          return scope.change();
        });
      }
    };
  });

  dssApp.directive('reqSelect', function() {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs) {
        var attributes, options;
        attributes = scope.$eval("{" + scope.item.attributes + "}");
        options = '<option value="none">-- select --</option>';
        angular.forEach(attributes, function(value, key) {
          options = options + '<option value="' + key + '">' + value + '</option>';
        });
        element.html('<label for="' + scope.item.name + '">' + scope.item.name + ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '"><i class="fi-lightbulb"></i></span></label><select name="' + scope.item.linkName + '" class="query">' + options + '</select>');
        return element.bind('change', function() {
          return scope.change();
        });
      }
    };
  });

  dssApp.directive('reqSlider', function() {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs) {
        var attributes;
        attributes = scope.$eval("{" + scope.item.attributes + "}");
        element.html('\
        <label style="margin-bottom: 5px;">' + scope.item.name + '<span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + '">\
        <i class="fi-lightbulb"></i></span></label>\
        <span class="label secondary radius right requirementValue">-</span>\
        <div style="width: 80%; margin-bottom: 15px;" class="noUiSlider"></div>\
      ');
        return element.find("div.noUiSlider").noUiSlider({
          range: attributes.range || [0, 100],
          start: attributes.start || 0,
          step: attributes.step || 1,
          handles: attributes.handles || 1,
          slide: function() {
            return $(this).prev("span.requirementValue").text($(this).val());
          }
        });
      }
    };
  });

  dssApp.controller('dssCtrl', function($scope, dataFactory) {
    $scope.queryElements = [];
    $scope.selectedServices = [];
    $scope.selectedServicesEdges = [];
    $scope.requirements = dataFactory.getAllRequirements();
    $scope.showSubcategory = function(categoryName) {
      $(document).foundation();
      $('.thirdLevelRequirements').hide();
      return $('#' + categoryName).fadeIn();
    };
    $scope.closeSubcategory = function(className) {
      return $("." + className).fadeOut();
    };
    $scope.addElementToQuery = function(categoryName) {
      var requirementName;
      requirementName = $("select." + categoryName).val();
      return angular.forEach($scope.requirements, function(requirement) {
        if (requirement.category === categoryName && requirement.name === requirementName && $scope.queryElements.indexOf(requirement) === -1) {
          return $scope.queryElements.push(requirement);
        }
      });
    };
    $scope.change = function() {
      var queryString;
      queryString = "select from Services where 1=1";
      $(".query").each(function() {
        var element, elementInputs, elementName, elementType, elementValue, queryElement;
        element = $(this);
        elementType = element.get(0).tagName;
        elementName = element.attr("name");
        switch (elementType) {
          case 'SELECT':
            elementValue = element.val();
            if (elementValue !== "none") {
              queryElement = " AND " + elementName + " = " + elementValue + "";
              return queryString = queryString + queryElement;
            }
            break;
          case 'INPUT':
            elementValue = element.val();
            if (elementValue) {
              queryElement = " AND " + elementName + " = '" + elementValue + "'";
              return queryString = queryString + queryElement;
            }
            break;
          case 'DIV':
            if (element.hasClass('noUiSlider')) {
              return console.log("slider");
            } else if (element.hasClass('switch')) {
              elementInputs = element.find("input");
              return elementInputs.each(function() {
                var elementInput;
                elementInput = $(this);
                if (elementInput.is(":checked")) {
                  elementValue = elementInput.attr("id");
                  queryElement = " AND " + elementName + " = " + elementValue;
                  return queryString = queryString + queryElement;
                }
              });
            }
            break;
          default:
            return console.log(elementType);
        }
      });
      if (queryString.search("AND") !== -1) {
        $scope.matchingServices = dataFactory.catchMatching(queryString);
      }
      console.log(queryString);
      console.log($scope.matchingServices);
      return $scope.selected = function(serviceBoxId) {
        var serviceBox, serviceObject;
        serviceBox = $("#service-" + serviceBoxId);
        serviceObject = $(this);
        serviceBox.toggleClass("selected");
        $scope.selectedServices.push(serviceObject);
        return console.log($scope.selectedServices);
      };
    };
    return $scope.$watch('selectedServices', function(value) {
      var queryEdges;
      queryEdges = "select from Services where 1=1";
      angular.forEach($scope.selectedServices, function(selectedService) {});
      console.log($scope.selectedServices);
      if ($scope.selectedServices.length) {
        return $scope.selectedServicesEdges = dataFactory.matchingServices(queryEdges);
      }
    });
  }, $(document).foundation());

}).call(this);
