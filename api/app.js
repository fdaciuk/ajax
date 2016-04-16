'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express()
var PORT = 3000

var users = require('./data/users')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

function handleRequest (req, res, next) {
  var userRequested = req.params.slug || req.body.slug
  var user = userRequested ? users[ userRequested ] : users
  if (!user) {
    res.status(404)
    user = '404 - Not found'
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
  res.json({ header: req.get('content-type' )})
})

app.listen(PORT)
console.log('Server listen on port ', PORT)

exports = module.exports = app
