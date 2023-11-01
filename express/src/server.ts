import express from 'express'
import cors from 'cors'

const server = express()

server.use(
  cors({
    origin: '*',
  })
)
server.use(express.static('uploads'))

server.listen(3244, () => console.log('Server started on port 3344'))
