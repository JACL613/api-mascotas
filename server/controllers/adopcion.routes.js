const rootAdopcion = require('express').Router()
const Mascota = require('../../database/models/mascota.models')
const Adopcion = require('../../database/models/adopcion.models')
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
  res.json(adopcionUpdate)
})
rootAdopcion.delete('/:id', async (req, res) => {
  const { id: adopcionId } = req.params
  const adopcionDelete = await Adopcion.findByIdAndDelete(adopcionId)
  res.json(adopcionDelete)
})
module.exports = rootAdopcion
