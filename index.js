const express = require('express')

const server = express()

server.get('/', (req, res) => {
  console.log('RUNTIME_ENV', process.env.RUNTIME)
  res.send('Hello Kinsta Private')
})
server.get('/cookie', (req, res) => {
  res.cookie('exampleCookie', 'cookieValue')
  res.send('Cookie Set')
})

const port = process.env.PORT || 8080
server.listen(port, () => {
  setInterval(() => {
    console.log('Pack Demo heartbeat 🧘')
  }, 2000)
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log(`Example app1 listening at http://localhost:${port}`)
})
