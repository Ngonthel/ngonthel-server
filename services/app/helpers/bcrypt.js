const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password, 10);
const verifyPassword = (password, dbPassword) => bcrypt.compareSync(password, dbPassword);

module.exports = { hashPassword, verifyPassword };
