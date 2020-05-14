import util from '../utils/utils';
import Queries from '../db/queries';
import getAllHelper from '../helpers/getAllHelper';
import sortDrivers from '../helpers/sortDrivers';
import getNearByDrivers from '../helpers/getNearbyDrivers';

export default class RidersController {
  static async getAllRiders(req, res) {
    const query = await Queries.select('*', 'riders');
    getAllHelper(query, res, util, 'All riders', 'No riders found');
  }

  static async getOneRider(req, res) {
    const { id } = req.params;
    const rider = await Queries.select('*', 'riders', `id=${id}`);
    getAllHelper(rider, res, util, 'Found Rider', `Couldn't find a Rider with the id ${id}`);
  }

  static async getNearByDrivers(req, res) {
    const { location } = req.params;
    const drivers = await getNearByDrivers(location);
    const nearDrivers = await sortDrivers(drivers).slice(0, 3);
    getAllHelper(
      nearDrivers,
      res,
      util,
      `Available drivers near ${location}`,
      `No driver is currently available near ${location}`
    );
  }
}
