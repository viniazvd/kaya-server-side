require('dotenv').config()

const test = require('ava')

const models = require('../../../infra/sequelize/models')

test.beforeEach(t => models.user.destroy({truncate: true}))
test.after.always(t => models.user.destroy({truncate: true}))

test.serial('list user', async t => {
  const userTest1 = { name: 'vinitest1', email: 'emailtest1@gmail.com', password: '123' }
  const userTest2 = { name: 'vinitest2', email: 'emailtest2@gmail.com', password: '123' }
  const newUser1 = await models.user.build(userTest1)
  const newUser2 = await models.user.build(userTest2)
  await newUser1.save()
  await newUser2.save()

  const list = await models.user.findAndCountAll()
  t.is(list.count, 2)
})

test.serial('create user', async t => {
  const userTest = { name: 'vinitest', email: 'emailtest@gmail.com', password: '123' }
  const newUser = await models.user.build(userTest)
  const result = await newUser.save()

  t.is(result.dataValues.email, 'emailtest@gmail.com')
})

test.serial('remove user', async t => {
  const userTest = { email: 'remover@gmail.com' }
  const newUser = await models.user.build(userTest)
  await newUser.save()

  const removed = await models.user.destroy({ where: { email: 'remover@gmail.com' } })

  t.is(removed, 1)
})

test.serial('update user', async t => {
  const userTest = { name: 'vinitest', email: 'emailtest@gmail.com', password: '123' }
  const newUser = await models.user.build(userTest)
  await newUser.save()

  const userUpdated = { email: 'emailtest2@gmail.com' }
  const updated = await models.user.update(userUpdated, { where: { email: 'emailtest@gmail.com' } })

  t.is(updated[0], 1)
})
