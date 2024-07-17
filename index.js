const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  console.log('RUNTIME_ENV', process.env.RUNTIME)
  res.send('Hello Kinsta Private 112')
})
server.get('/cookie', (req, res) => {
  res.cookie('exampleCookie', 'cookieValue')
  res.send('Cookie Set')
})

server.get('/get', (req, res) => {
  res.send({ test: 123, hello: 'internal kinsta1' })
})

server.get('/health', (req, res) => {
  res.send({ success: true })
})

server.get('/internal', async (req, res) => {
  console.log('INTERNAL', process.env.REMOTE_SERVER)
  try {
    const response = await fetch(process.env.REMOTE_SERVER)
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send(`Error fetching data: ${JSON.stringify(error)}`)
  }
})

const port = process.env.PORT || 8080
server.listen(port, () => {
  setInterval(() => {
    console.log('Pack Demo heartbeat 🧘')
  }, 4000)
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log(`Example app1 listening at http://localhost:${port}`)
})
