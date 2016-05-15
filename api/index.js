'use strict'

const app = require('./app')
const PORT = 3000
const server = app.listen(PORT)

const gracefulShutdown = () => {
  console.log('Server is closing...')
  server.close(() => {
    console.log('Server closed.')
    process.exit()
  })

  setTimeout(() => process.exit(), 3000)
}

process.on('SIGINT', () => gracefulShutdown())
process.on('SIGTERM', () => gracefulShutdown())

console.log('Server listen on port ', PORT)

