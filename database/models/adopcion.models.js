const { Schema, model } = require('mongoose')

const SchemaAdopcion = new Schema({
  direccion: { type: String, require: true },
  documento: { type: Number, require: true },
  telefono: { type: Number, require: true },
  idMascota: { type: String, require: true },
  nombreMascota: { type: String, require: true },
  confirm: { type: Boolean, default: false }
})
SchemaAdopcion.set('toJSON', {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id
    delete returnObj._id
    delete returnObj.__v
  }
})
const Adopcion = model('adopcion', SchemaAdopcion)
module.exports = Adopcion
