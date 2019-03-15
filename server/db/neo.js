const neo4j = require('neo4j-driver').v1
const dotenv = require('dotenv')
dotenv.config()

const graphURI = process.env.GRAPH_BOLT_URI
const graphUsername = process.env.GRAPH_BOLT_USER
const graphPassword = process.env.GRAPH_BOLT_PASSWORD

const driver = neo4j.driver(
  graphURI,
  neo4j.auth.basic(graphUsername, graphPassword)
)
const session = driver.session()

module.exports = {session, driver}
