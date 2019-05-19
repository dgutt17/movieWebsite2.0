const neo4j = require('neo4j-driver').v1
const dotenv = require('dotenv')
var path = require('path')
var appDir = path.dirname(require.main.filename)
dotenv.config()

const graphURI = process.env.GRAPH_BOLT_URI
const graphUsername = process.env.GRAPH_BOLT_USER
const graphPassword = process.env.GRAPH_BOLT_PASSWORD

console.log('appDir: ', appDir)

let cypherQuery = `
create constraint on (m:Movie) assert m.id is unique;

using periodic commit
load csv with headers from
'file:///${appDir}/movieWebsite2/script/import_neo/data'

`
