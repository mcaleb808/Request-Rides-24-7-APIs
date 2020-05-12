import { Router } from 'express';
import DriversController from '../controllers/driversController';
import async from '../middleware/async';
import idHandler from '../middleware/idHandler';

const router = Router();

router.route('/').get(async(DriversController.getAllDrivers));
router.route('/available').get(async(DriversController.getAvailableDrivers));
router.route('/:id').get(idHandler, async(DriversController.getOneDriver));
router.route('/available/:location').get(async(DriversController.getNearByDrivers));

export default router;
