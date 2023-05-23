const getCustomerData = (db,id) => db.query('SELECT * FROM CUSTOMER WHERE id = ?', [id])

module.exports = {
  getCustomerData,
}
