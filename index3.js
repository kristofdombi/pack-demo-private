const express = require('express')

const server = express()

function generateRandomIP() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join('.');
}

// Function to generate a random date and time in Apache log format
function generateRandomDate() {
  const date = new Date();
  return `[${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} +0000]`;
}

// Function to generate a random HTTP method
function generateRandomMethod() {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  return methods[Math.floor(Math.random() * methods.length)];
}

// Function to generate a random URL
function generateRandomURL() {
  const paths = ['/home', '/about', '/products', '/contact'];
  return paths[Math.floor(Math.random() * paths.length)];
}

// Function to generate a random HTTP status code
function generateRandomStatusCode() {
  const codes = [200, 301, 404, 500];
  return codes[Math.floor(Math.random() * codes.length)];
}

function getColorForMethod(method) {
  const colorCodes = {
    'GET': '\x1b[37m', // White
    'POST': '\x1b[32m', // Green
    'PUT': '\x1b[34m', // Blue
    'DELETE': '\x1b[31m', // Red
    'PATCH': '\x1b[33m' // Yellow
  };
  return colorCodes[method] || '\x1b[37m'; // Default to white if method not matched
}

// Function to generate a random user agent
function generateRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    'Mozilla/5.0 (Linux; Android 10; SM-G973F)',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)',
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Function to generate a random access log entry
function generateLogEntry() {
  return `${generateRandomIP()} - "${generateRandomMethod()} ${generateRandomURL()} HTTP/1.1" ${generateRandomStatusCode()} "-" "${generateRandomUserAgent()}"`;
}

function generateLogEntryWithColor() {
  const method = generateRandomMethod();
  const colorCode = getColorForMethod(method);
  const resetCode = '\x1b[0m'; // Reset color
  return `${colorCode}${generateRandomIP()} - - ${generateRandomDate()} "${method} ${generateRandomURL()} HTTP/1.1" ${generateRandomStatusCode()} "-" "${generateRandomUserAgent()}"${resetCode}`;
}

function generateLogsAtRandomIntervals() {
  const generateAndPrintLog = () => {
    console.log(generateLogEntryWithColor());
    const nextInterval = Math.random() * (2000 - 50) + 50;
    setTimeout(generateAndPrintLog, nextInterval);
  };

  generateAndPrintLog(); // Start generating logs
}

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
  generateLogsAtRandomIntervals()
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log(`Example app1 listening at http://localhost:${port}`)
})
