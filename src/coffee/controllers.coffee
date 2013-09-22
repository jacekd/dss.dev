dssApp.controller('requirements', ($scope, catchRequirementsFactory) ->
  $scope.queryElements = []

  $scope.requirements = catchRequirementsFactory.getAll()

  $scope.showSubcategory = (categoryName) ->
    # Init foundation
    $(document).foundation()

    # Hide all panels and display the appropriate one
    $('.thirdLevelRequirements').hide()
    $('#' + categoryName).fadeIn()

  $scope.closeSubcategory = (className) ->
    $("." + className).fadeOut()

  $scope.addElementToQuery = (categoryName) ->
    requirementName = $("select." + categoryName).val()

    angular.forEach($scope.requirements, (requirement) ->
      $scope.queryElements.push(requirement) if requirement.category is categoryName and requirement.name is requirementName and $scope.queryElements.indexOf(requirement) is -1
    )

  $scope.change = () ->
    queryString = ""
    $(".query").each(() ->
      element = $(@)
      elementType = element.get(0).tagName
      switch elementType
        when 'INPUT'
          elementValue = element.val()
          elementName = element.attr("name")
          if (elementValue)
            queryElement = "AND " + elementName + " = '" + elementValue + "'"
            queryString = queryString + queryElement
            console.log queryElement
        when 'DIV'
          ## check if it is slider or radio switch
          if element.hasClass('noUiSlider')
            console.log "slider"
          else if element.hasClass('switch')
            console.log "switch"
        when 'SELECT'
          console.log elementType
    )

  # watch query items change, but it does not watch it's values

#  $scope.$watch('queryElements', (newValue, oldValue) ->
#    console.log newValue
#  , true)

# Initialize foundation
$(document).foundation()
)
