const rootMascotas = require('express').Router()
const Mascota = require('../../database/models/mascota.models')
const { upload } = require('../services/config.multer')
rootMascotas.get('/hello', (req, res) => {
  res.send('hello Word')
})
rootMascotas.get('/', async (req, res) => {
  const mascotas = await Mascota.find({})
  res.json(mascotas)
})
rootMascotas.post('/', upload.single('file'), async (req, res) => {
  const {
    file, body: {
      nombre,
      raza,
      edad,
      categoria
    }
  } = req
  const newMascota = new Mascota({
    nombre,
    raza,
    edad,
    categoria,
    stateAdopcion: false,
    refImg: file.filename
  })
  const mascotaSave = await newMascota.save()
  res.json(mascotaSave)
})
rootMascotas.put('/:id', async (req, res) => {
  const { body } = req
  const mascotaId = req.params.id
  const {
    nombre,
    raza,
    edad,
    categoria,
    stateAdopcion,
    refImg
  } = body
  const updateM = {
    nombre,
    raza,
    edad,
    categoria,
    stateAdopcion,
    refImg
  }
  const mascotaUptdate = await Mascota.findByIdAndUpdate({ _id: mascotaId }, updateM)
  res.json(mascotaUptdate)
})
rootMascotas.delete('/:id', async (req, res) => {
  const { id: mascotaId } = req.params
  const mascotaDelete = await Mascota.findByIdAndRemove(mascotaId)
  res.json(mascotaDelete)
})
module.exports = rootMascotas
