import TripValidator from '../helpers/tripValidator';
import util from '../utils/utils';
import errorToString from '../helpers/formatError';

export default class TripValidators {
  static create(req, res, next) {
    const { error } = TripValidator.create(req.body);
    if (error) {
      const newMessage = errorToString(error);
      util.setError(400, newMessage);
      return util.send(res);
    }
    return next();
  }
}
