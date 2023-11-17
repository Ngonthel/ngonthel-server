const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token)
    const payload = verifyToken(access_token);
    req.user = { id: payload.id };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
