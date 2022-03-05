const errorHandler = (err, req, resp, next) => {
  const statusCode = resp.statusCode || 500;

  resp.status(statusCode);

  resp.json({
    err: err.message,
    stack: process.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
