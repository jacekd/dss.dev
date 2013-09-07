dssApp.directive('render', ->
  (scope, element, attrs) ->
    attrs.$observe('parameters', (value) ->
      attributes = scope.$eval("{" + attrs.parameters + "}")
      renderValue = attrs.render

      if renderValue is "slider"
        return {} = 
        restrict: 'A'
        link: element.noUiSlider({
            range: attributes.range or [0,100]
            start: attributes.start or 0
            step: attributes.step or 1
            handles: attributes.handles or 1
            slide: -> 
              $(@).prev("span.requirementValue").text($(@).val())
          })
      else if renderValue is "select"
        options = '<option value="none">-- select --</option>'
        angular.forEach(attributes, (value, key) ->
          options = options + '<option value="' + key + '">' + value + '</option>'
          return
        )
        return {} =
          restrict: 'E'
          link: element.html('<label for="' + element.text() + '">' + element.text() + 
          ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + 
          '"><i class="fi-lightbulb"></i></span></label><select name="' + element.text() + 
          '">' + options + '</select>')
      else if renderValue is "input"
        return {} = 
          restrict: 'E'
          link: element.html('<label for="' + element.text() + '">' + element.text() + 
          ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + 
          '"><i class="fi-lightbulb"></i></span></label><input name="' + element.text() + 
          '" type=' + attributes.type + ' class="large-12 columns">')
      else if renderValue is "radio"
        return {} = 
          restrict: 'E'
          link: element.html('<label for="' + element.text() + '">' + element.text() + 
          ' <span data-tooltip class="has-tip tip-top" title="' + scope.item.definition + 
          '"><i class="fi-lightbulb"></i></span></label><div class="switch small"><input id="z" name="' + element.text() + 
          '" type="radio" checked><label for="z" onclick="">NO</label><input id="z1" name="' + element.text() + 
          '" type="radio"><label for="z1" onclick="">YES</label><span></span></div>')
      else
        console.log 'ouch'

      $(document).foundation()
      return
    )
)
