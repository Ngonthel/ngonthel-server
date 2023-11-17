const errorHandler = (err, req, res, next) => {
  console.log(err, ">>> ERROR DI ERROR HANDLER APP");
  let status = 500;
  let message = "Internal Server Error!";

  if (err.name === "auth_error") {
    status = 401;
    message = err.message;
  } else if (err.name === "validation_error") {
    status = 400;
    message = err.message;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
