const mongoose = require('mongoose')
let conecctionString
if (process.env.NODE_ENV === 'test') {
  // console.log('entorno de tests')
  conecctionString = process.env.DB_URI_TEST
} else {
  conecctionString = process.env.DB_URI
}

mongoose.connect(`${conecctionString}`)
  .then(() => {
    console.log('Data bases Listening')
  })
  .catch(err => {
    console.log({
      status: 400,
      error: err.message
    })
  })
