const { services } = require('../../../domain').tasks

const [all, one, create, update, remove] = ['all', 'one', 'create', 'update', 'remove']
  .map(middlewares => require(`./${middlewares}`))
  .map(inject => inject(services))

module.exports = { all, one, create, update, remove }
