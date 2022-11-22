const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const root = require('express').Router()
const User = require('../../database/models/user.models')

root.post('/', async (req, res) => {
  const { body } = req
  const { name, nameuser, password } = body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    name,
    nameuser,
    passwordHash,
    date: new Date().getTime()
  })
  const saveUser = await user.save()
  res.status(200).json(saveUser)
})

root.post('/login', async (req, res) => {
  const { body } = req
  const { nameuser, password } = body

  const user = await User.findOne({ nameuser })
  const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    res.status(401).json({ errors: 'invalid user or password' })
  }
  const userForToken = {
    id: user._id,
    nameuser: user.nameuser
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  if (passwordCorrect === true) {
    res.send({
      name: user.name,
      username: user.nameuser,
      token,
      refAvatar: user.refAvatar

    })
  }
})

module.exports = root
