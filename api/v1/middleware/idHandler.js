import util from '../utils/utils';

const idHandler = async (req, res, next) => {
  const { id } = req.params;
  if (Number.isNaN(+id)) {
    util.setError(400, 'the id given is not a valid number');
    return util.send(res);
  }
  return next();
};
export default idHandler;
