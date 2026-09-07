const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  console.log('RUNTIME_ENV', process.env.RUNTIME)
  res.send('Hello Kinsta Private 1121')
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

server.get('/egress-ip', async (req, res) => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    if (!response.ok) throw new Error(`Upstream responded with ${response.status}`)
    const { ip } = await response.json()
    res.send({ egressIp: ip })
  } catch (error) {
    console.log('EGRESS_IP', error)
    res.status(502).send({ error: 'Could not determine egress IP', details: error.message })
  }
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
