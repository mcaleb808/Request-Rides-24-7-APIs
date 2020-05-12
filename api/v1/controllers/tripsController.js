import moment from 'moment';
import util from '../utils/utils';
import Queries from '../database/queries';
import getAllHelper from '../helpers/getAllHelper';
import getDistance from '../helpers/getDistance';

export default class TripsController {
  static async getAllTrips(req, res) {
    const query = await Queries.select('*', 'trips', "status='ongoing'");
    getAllHelper(query, res, util, 'All active trips', 'No trip found');
  }

  static async createTrip(req, res) {
    const { pickUpPoint, destination, riderId, driverId } = req.body;
    try {
      const driver = await Queries.select('*', 'drivers', `id=${driverId}`);
      if (driver.length < 1) {
        util.setError(404, 'Driver not found, please select a different driver');
        return util.send(res);
      }
      if (driver && driver[0].status !== 'available') {
        util.setError(
          404,
          'This driver is currently unavailable, please select a different driver'
        );
        return util.send(res);
      }
      const createTrip = await Queries.insert(
        'trips',
        'pickup_point, destination, rider_id, driver_id, status',
        '$1, $2, $3, $4, $5',
        [pickUpPoint, destination, riderId, driverId, 'ongoing'],
        '*'
      );
      const updateDriverStatus = await Queries.update(
        'drivers',
        "status= 'busy'",
        `id='${driverId}'`,
        'fullname, plate_no, phone'
      );
      createTrip.assignedDriver = updateDriverStatus;
      util.setSuccess(201, 'Trip successfully created', createTrip);
      return util.send(res);
    } catch (err) {
      util.setError(400, err.message);
      return util.send(res);
    }
  }

  static async completeTrip(req, res) {
    const { id } = req.params;
    try {
      const trip = await Queries.select('*', 'trips', `id=${id}`);
      if (trip.length < 1 || trip[0].status === 'completed') {
        util.setError(404, 'Trip not found');
        return util.send(res);
      }

      const tripDistance = await getDistance(trip[0].pickup_point, trip[0].destination);
      const amount = `${tripDistance.split(' ')[0] * 700} Rwf`;
      const createInvoice = await Queries.insert(
        'invoices',
        'amount, status, trip_id',
        '$1, $2, $3',
        [amount, 'paid', trip[0].id],
        '*'
      );
      await Queries.update('trips', "status= 'completed'", `id='${trip[0].id}'`, 'status');
      const updateDriverStatus = await Queries.update(
        'drivers',
        "status= 'available'",
        `id='${trip[0].driver_id}'`,
        'fullname, plate_no, phone'
      );
      util.setSuccess(201, 'Trip successfully completed', {
        Invoice: { ...createInvoice, created_on: moment(createInvoice.created_on).format('LLL') },
        Driver: updateDriverStatus
      });
      return util.send(res);
    } catch (err) {
      util.setError(400, err.message);
      return util.send(res);
    }
  }
}
