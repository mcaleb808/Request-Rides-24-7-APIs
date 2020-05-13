export default handler => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 500;
    return res.status(error.status).json({ message: error.message, ...error });
  }
};
