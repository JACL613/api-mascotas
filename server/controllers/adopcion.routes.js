const rootAdopcion = require('express').Router()
const Mascota = require('../../database/models/mascota.models')
const Adopcion = require('../../database/models/adopcion.models')
const jwt = require('jsonwebtoken')

rootAdopcion.get('/', async (req, res) => {
  const adoptados = await Adopcion.find({})
  res.json(adoptados)
})
rootAdopcion.post('/', async (req, res) => {
  const {
    direccion,
    documento,
    telefono,
    idMascota,
    nombreMascota
  } = req.body
  const newAdopcion = new Adopcion({
    direccion,
    documento,
    telefono,
    idMascota,
    nombreMascota
  })
  const mascota = await Mascota.find({ _id: idMascota })
  await Mascota.findByIdAndUpdate({ _id: idMascota }, { ...mascota, stateAdopcion: true })
  const adopcionSave = await newAdopcion.save()
  res.json(adopcionSave)
})
rootAdopcion.put('/:id', async (req, res) => {
  const autorization = req.get('authorization')
  let token = ''

  if (autorization && autorization.toLowerCase().startsWith('bearer')) {
    token = autorization.substring(7)
  }
  if (!token) {
    return res.status(400).json({ menssage: 'Invalid token' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken) {
    return res.status(400).json({ error: 'Invalid token' })
  }
  const { id: adopcionId } = req.params
  const {
    direccion,
    documento,
    telefono,
    idMascota,
    nombreMascota
  } = req.body
  const updateA = {
    direccion,
    documento,
    telefono,
    idMascota,
    nombreMascota,
    confirm: true
  }
  const adopcionUpdate = await Adopcion.findByIdAndUpdate({ _id: adopcionId }, updateA)
  if (adopcionUpdate) {
    await Mascota.find({ _id: idMascota })
    await Mascota.findByIdAndDelete({ _id: idMascota })
  }
  res.json(adopcionUpdate)
})
rootAdopcion.post('/delete/:id', async (req, res) => {
  const autorization = req.get('authorization')
  let token = ''
  console.log(autorization)
  if (autorization && autorization.toLowerCase().startsWith('bearer')) {
    token = autorization.substring(7)
  }
  if (!token) {
    return res.status(203).json({ menssage: 'Invalid token' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken) {
    return res.status(203).json({ error: 'Invalid token' })
  }
  const { id: adopcionId } = req.params
  console.log(req.body)
  const { idMascota } = req.body
  const adopcionDelete = await Adopcion.findByIdAndDelete(adopcionId)
  if (idMascota) {
    console.log('se elimino Mascota')
    const mascota = await Mascota.find({ _id: idMascota })
    if (mascota) {
      await Mascota.findByIdAndUpdate({ _id: idMascota }, { ...mascota, stateAdopcion: false })
    }
  }
  res.status(200).json(adopcionDelete)
})
module.exports = rootAdopcion
