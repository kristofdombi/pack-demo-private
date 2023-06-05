const express = require('express')

const server = express()

server.get('/', (req, res) => {
  console.log('RUNTIME_ENV', process.env.RUNTIME)
  res.send('Hello Kinsta Private')
})
const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log(`Example app1 listening at http://localhost:${port}`)
})
