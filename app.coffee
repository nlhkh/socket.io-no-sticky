express = require 'express'
io = require 'socket.io'
http = require 'http'
app = express()
server = http.createServer(app)
io = io.listen server

server.listen 4040

app.use(express.static "#{__dirname}/public")

# Redis adapter
redis = require 'socket.io-redis'
io.adapter(redis({ host: 'localhost', port: 6379}))

chat = io.of 'chat'
chat.on 'connection', (socket) ->
  socket.on 'newMessage', (message) ->
    socket.broadcast.emit 'newMessage', message
