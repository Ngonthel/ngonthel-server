const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);

    req.user = { id: payload.id };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
