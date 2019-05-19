const router = require('express').Router()
const {session} = require('../db/neo')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let query = `MATCH (n) return n`
    let result = await session.run(query)
    console.log('result: ', result.records)
    res.json(result.records)
  } catch (err) {
    next(err)
  }
})
