// controller/admincontroller.js
const dashboard = (req, res) => {
    res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
  };
  
  module.exports = { dashboard };