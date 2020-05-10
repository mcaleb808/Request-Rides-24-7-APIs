const getAllHelper = async (query, res, util, message, error) => {
  try {
    const results = await query;
    if (results.length > 0) {
      util.setSuccess(200, message, results);
    } else {
      util.setError(404, error);
    }
    return util.send(res);
  } catch (err) {
    util.setError(400, err);
    return util.send(res);
  }
};

export default getAllHelper;
