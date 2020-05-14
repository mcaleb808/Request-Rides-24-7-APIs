import Queries from '../../../db/queries';
import getAllHelper from './getAllHelper';

const getOneHelper = async (res, util, id, name, table) => {
  const data = await Queries.select('*', `${table}`, `id=${id}`);
  return getAllHelper(
    data,
    res,
    util,
    `Found ${name}`,
    `Couldn't find a ${name} with the id ${id}`
  );
};

export default getOneHelper;
