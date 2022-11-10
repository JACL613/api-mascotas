require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const rutasMascotas = require('./controllers/mascotas.routes')
const rutasAdopciones = require('./controllers/adopcion.routes')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join((__dirname, '../build'))))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

require('../database/connectionDB')

if (process.env.NODE_ENV === 'test') {
  console.log('entorno de tests')

  app.set('port', process.env.PORT_TEST || 8080)
} else {
  app.set('port', process.env.PORT || 3003)
}

app.use('/api/mascotas', rutasMascotas)
app.use('/api/adopciones', rutasAdopciones)
const server = app.listen(app.get('port'), () => {
  console.log('server listening on port: ', app.get('port'))
})
module.exports = { app, server }
