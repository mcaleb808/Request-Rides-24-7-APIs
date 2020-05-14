import util from '../utils/utils';
import Queries from '../db/queries';
import getAllHelper from '../helpers/getAllHelper';
import getNearByDrivers from '../helpers/getNearbyDrivers';

export default class DriversController {
  static async getAllDrivers(req, res) {
    const query = await Queries.select('*', 'drivers');
    getAllHelper(query, res, util, 'All drivers', 'No driver found');
  }

  static async getAvailableDrivers(req, res) {
    const query = await Queries.select('*', 'drivers', "status='available'");
    getAllHelper(query, res, util, 'Available drivers', 'No driver is currently available');
  }

  static async getOneDriver(req, res) {
    const { id } = req.params;
    const driver = await Queries.select('*', 'drivers', `id=${id}`);
    getAllHelper(driver, res, util, 'Found Driver', `Couldn't find a Driver with the id ${id}`);
  }

  static async getNearByDrivers(req, res) {
    const { location } = req.params;
    const drivers = await getNearByDrivers(location);
    const nearByDrivers = [];
    for (const driver of drivers) {
      if (driver.distance.split(' ')[0] <= 3 || driver.distance.split(' ')[1] === 'm') {
        nearByDrivers.push(driver);
      }
    }
    getAllHelper(
      nearByDrivers,
      res,
      util,
      `Available drivers near ${location}`,
      `No driver is currently available near ${location}`
    );
  }
}
