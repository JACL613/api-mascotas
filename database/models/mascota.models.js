const { Schema, model } = require('mongoose')

const SchemaMascota = new Schema({
  nombre: { type: String, required: true },
  raza: { type: String, required: true },
  edad: { type: Number, requiredd: true },
  categoria: { type: String, required: true },
  stateAdopcion: { type: Boolean, required: true },
  refImg: { type: Number, required: true }
})
SchemaMascota.set('toJSON', {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id
    delete returnObj._id
    delete returnObj.__v
  }
})

const Mascota = model('mascota', SchemaMascota)
module.exports = Mascota
