import Joi from '@hapi/joi';

export default class TripValidator {
  static create(trip) {
    const schema = Joi.object().keys({
      pickUpPoint: Joi.string()
        .required()
        .min(3)
        .max(60)
        .trim(),
      destination: Joi.string()
        .required()
        .min(3)
        .max(60)
        .trim(),
      riderId: Joi.number().required(),
      driverId: Joi.number().required()
    });
    return schema.validate(trip, { abortEarly: false });
  }
}
