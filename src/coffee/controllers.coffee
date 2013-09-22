dssApp.controller('dssCtrl', ($scope, dataFactory) ->
  $scope.queryElements = []

  $scope.requirements = dataFactory.getAllRequirements()

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
    queryString = "select from Services where 1=1"
    $(".query").each(() ->
      element = $(@)
      elementType = element.get(0).tagName
      elementName = element.attr("name")
      switch elementType
        when 'SELECT'
          elementValue = element.val()
          if elementValue isnt "none"
            queryElement = " AND " + elementName + " = " + elementValue + ""
            queryString = queryString + queryElement
        when 'INPUT'
          elementValue = element.val()
          if elementValue
            queryElement = " AND " + elementName + " = '" + elementValue + "'"
            queryString = queryString + queryElement
        when 'DIV'
          ## check if it is slider or radio switch
          if element.hasClass('noUiSlider')
            console.log "slider"
          else if element.hasClass('switch')
            elementInputs = element.find("input")
            elementInputs.each(() ->
              elementInput = $(@)
              if elementInput.is(":checked")
                elementValue = elementInput.attr("id")
                queryElement = " AND " + elementName + " = " + elementValue
                queryString = queryString + queryElement
            )
        else
          console.log elementType
    )

    $scope.matchingServices = dataFactory.catchMatching(queryString)

    # Debugging
    console.log queryString
    console.log($scope.matchingServices)




  # watch query items change, but it does not watch it's values

#  $scope.$watch('queryElements', (newValue, oldValue) ->
#    console.log newValue
#  , true)

# Initialize foundation
$(document).foundation()
)
