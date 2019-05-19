const neo4j = require('neo4j-driver').v1
const dotenv = require('dotenv')
var path = require('path')
var Root = path.dirname(require.main.filename)
dotenv.config()

const graphURI = process.env.GRAPH_BOLT_URI
const graphUsername = process.env.GRAPH_BOLT_USER
const graphPassword = process.env.GRAPH_BOLT_PASSWORD

let cypherQuery = `
create constraint on (m:Movie) assert m.id is unique;
create constraint on (l:Language) assert l.name is unique;

using periodic commit
load csv with headers from
'file:///${Root}/movieWebsite2/script/import_neo/data/title.akas.tsv' as line
fieldterminator '\t'

create (movie:Movie {id: TOINT(line.titleId), title: line.title})

merge(language:Language {name: line.language})
;
`

console.log('cypherQuery: ', cypherQuery)
