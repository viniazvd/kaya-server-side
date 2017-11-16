module.exports = service => (req, res) => {
  service.listAll()
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}
