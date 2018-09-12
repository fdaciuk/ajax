'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()

const users = require('./data/users')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const { join } = require('path')
app.use(express.static(join(__dirname, '../')))

function handleRequest (req, res, next) {
  const userRequested = req.params.slug || req.body.slug
  let user = userRequested ? users[userRequested] : users
  if (!user) {
    res.status(404)
    user = '404 - Not found'
  }

  if (userRequested === 'lazy') {
    setTimeout(() => {
      res.json(user)
    }, 3000)
    return
  }
  res.json(user)
}

app.get('/api/users', handleRequest)
app.get('/api/user/:slug', handleRequest)
app.post('/api/user', handleRequest)
app.post('/api/user/:slug', handleRequest)
app.put('/api/user/:slug', handleRequest)
app.delete('/api/user/:slug', handleRequest)
app.post('/api/formdata', upload.any(), (req, res) => {
  res.json({ body: req.body, files: req.files })
})
app.post('/api/getheader', (req, res) => {
  res.json({ header: req.get('content-type') })
})
app.get('/api/getdata', (req, res) => {
  res.json(req.query)
})

app.put('/api/complex/object', (req, res) => {
  res.json(req.body)
})

exports = module.exports = app
