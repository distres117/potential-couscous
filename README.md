### Summary
This is a complete fullstack javascript rebuild of a legacy desktop application used for managing, tracking and reporting on datasets maintained by the data team.  

### Notes
As part of a GIS workflow, this application is designed to be run alongside [ESRI ArcGIS](https://www.arcgis.com/features/index.html). Currently, some functionality is only available in a published [geoprocessing service](http://server.arcgis.com/en/server/latest/publish-services/linux/what-is-a-geoprocessing-service-.htm) which is not included in this repo.  A comprehensive live demo is forthcoming.  To demo the app, you'll need to provide a database to connect to (MSSQL by default).

### Tech
  - Front end
    - React
    - Redux
    - Webpack
    - Babel
    - Bootstrap
  - Server
    - Node
    - Sequelize
    - GraphQL
    - Express
