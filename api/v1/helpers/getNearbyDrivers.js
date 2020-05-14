import Queries from '../../../db/queries';
import getDistance from './getDistance';

const getNearByDrivers = async location => {
  const drivers = await Queries.select('*', 'drivers', "status='available'");
  const nearByDrivers = [];
  for (const driver of drivers) {
    const destinations = [driver.location];
    const response = await getDistance(location, destinations);
    driver.distance = response;
    nearByDrivers.push(driver);
  }
  return nearByDrivers;
};

export default getNearByDrivers;
