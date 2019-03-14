const neo4j = require('neo4j-driver').v1

const graphURI = process.env.GRAPH_BOLT_URI || 'bolt://localhost'
const graphUsername = process.env.GRAPH_BOLT_USER || 'neo4j'
const graphPassword = process.env.GRAPH_BOLT_PASSWORD || '123456'

const driver = neo4j.driver(
  graphURI,
  neo4j.auth.basic(graphUsername, graphPassword)
)
const session = driver.session()

module.exports = {session, driver}
