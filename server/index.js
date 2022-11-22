require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const { upload } = require('./services/config.multer')
const rutasMascotas = require('./controllers/mascotas.routes')
const rutasAdopciones = require('./controllers/adopcion.routes')
const rutasUser = require('./controllers/user.routes')
const app = express()

app.post('/stats', upload.single('uploaded_file'), async function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  const file = req.file
  if (file) {
    const url = `${path.join(__dirname, 'public/uploads/', file.filename)}`
    res.send(`se guardo: ${url}`).status(200)
  }
})

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

require('../database/connectionDB')

if (process.env.NODE_ENV === 'test') {
  console.log('entorno de tests')

  app.set('port', process.env.PORT_TEST || 8080)
} else {
  app.set('port', process.env.PORT || 3003)
}

app.use('/api/mascotas', rutasMascotas)
app.use('/api/adopciones', rutasAdopciones)
app.use('/api/users', rutasUser)
app.get('/', (req, res) => {
  res.render('index.html')
})
app.post('/profile', upload.single('file'), async function (req, res, next) {
  console.log(req.file)
  // res.status(208).send('hello')
  const { file, body: { name } } = req
  if (file && name) {
    const url = `${path.join(__dirname, 'public/uploads/', file.filename)}`

    res.status(200).send(url)
  } else {
    res.status(404).send('bad request')
  }
})

const server = app.listen(app.get('port'), () => {
  console.log('server listening on port: ', app.get('port'))
})
module.exports = { app, server }
