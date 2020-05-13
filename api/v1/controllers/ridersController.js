import util from '../utils/utils';
import Queries from '../database/queries';
import getAllHelper from '../helpers/getAllHelper';
import getDistance from '../helpers/getDistance';

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
    const drivers = await Queries.select('*', 'drivers', "status='available'");

    const nearByDrivers = [];
    const distanceSet = [];
    for (const driver of drivers) {
      const destinations = [driver.location];
      const response = await getDistance(location, destinations);
      if (response) {
        const value = response.split(' ')[0];
        const distance = response.split(' ')[1] === 'm' ? value / 1000 : value;
        driver.distance = response;
        if (nearByDrivers.length >= 3) {
          const max = Math.max(...distanceSet);
          if (distance < max) {
            nearByDrivers.splice(nearByDrivers.indexOf(max), 1);
            nearByDrivers.push(driver);
            distanceSet.push(distance);
          }
          distanceSet.push(distance);
        } else {
          nearByDrivers.push(driver);
          distanceSet.push(distance);
        }
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
