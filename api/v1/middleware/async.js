export default handler => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    let error = new Error(err.message || 'Internal server error');
    error.status = 500;
    if (err && err.details) {
      [error] = err.details;
      error.status = 400;
    }
    return res.status(error.status).json({ message: error.message, ...error });
  }
};
