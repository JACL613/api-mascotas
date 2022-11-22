const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SchemaUser = new Schema({
  name: { type: String, require: true, unique: true },
  nameuser: { type: String, require: true, unique: true },
  passwordHash: { type: String, require: true, unique: true },
  date: { type: Date }

})

SchemaUser.set('toJSON', {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id
    delete returnObj._id
    delete returnObj.__v
    delete returnObj.passwordHash
  }
})
SchemaUser.plugin(uniqueValidator)

const user = model('user', SchemaUser)
module.exports = user
