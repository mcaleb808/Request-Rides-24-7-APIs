import Queries from '../db/queries';

const updateDriverStatus = async (status, id) => {
  await Queries.update('drivers', `status='${status}'`, `id='${id}'`, 'fullname, plate_no, phone');
};

export default updateDriverStatus;
