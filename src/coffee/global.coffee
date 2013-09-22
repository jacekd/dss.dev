dssApp = angular.module('dssApp', [])

functionalDatabaseUrl = "http://localhost:2480/functional"
csdDatabaseUrl = "http://localhost:2480/csd"

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

dssApp.factory('catchServices', ->
  csdDatabase = new ODatabase(csdDatabaseUrl)
  csdDatabaseInfo = csdDatabase.open('admin', 'admin')

  methods = {}
  methods.catchMatching = (query) ->
    query = csdDatabase.query(query, 30) # catch first 30 matching services
    query.result
  csdDatabase.close()
  methods
)
