dssApp = angular.module('dssApp', [])

functionalDatabaseUrl = "http://localhost:2480/functional"
metricsDatabaseUrl = "http://localhost:2480/metric"

dssApp.factory('catchRequirementsFactory', ->
  functionalDatabase = new ODatabase(functionalDatabaseUrl)
  functionalDatabaseInfo = functionalDatabase.open('admin', 'admin')

  methods = {}
  methods.getAll = ->
    query = functionalDatabase.query('select from Requirements', 1000)
    query.result
  functionalDatabase.close()
  methods
)
