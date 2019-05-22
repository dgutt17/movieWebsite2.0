const neo4j = require('neo4j-driver').v1
const dotenv = require('dotenv')
var path = require('path')
var file_path = path.dirname(require.main.filename)
file_path = file_path.slice(0, root.length)
dotenv.config()

const graphURI = process.env.GRAPH_BOLT_URI
const graphUsername = process.env.GRAPH_BOLT_USER
const graphPassword = process.env.GRAPH_BOLT_PASSWORD

const driver = neo4j.driver(
  graphURI,
  neo4j.auth.basic(graphUsername, graphPassword)
)
const session = driver.session()

let constraintOne = 'create constraint on (m:Movie) assert m.id is unique;'
let constraintTwo = 'create constraint on (l:Language) assert l.name is unique;'

let nodeRelationQuery = `
using periodic commit
load csv with headers from
'file:////Users/dangutt/Desktop/movieWebsite2/script/import_neo/data/title_akas.tsv' as line
fieldterminator '\t'

foreach (x in case when line.title is null then [] else [1] end | 
    create (movie:Movie {id: TOINT(line.titleId), title: line.title})
)

foreach (x in case when line.language is null then [] else [1] end | 
    merge(language:Language {name: line.language})
)

create (movie)-[:MovieLanguage]->(language)
;
`

console.log('path: ', file_path)
const resultPromise = session.run(nodeRelationQuery)

resultPromise.then(result => {
  session.close()

  const singleRecord = result.records[0]
  const node = singleRecord.get(0)

  console.log(node.properties.name)

  // on application exit:
  driver.close()
})
