import { Router } from 'express';
import RidersController from '../controllers/ridersController';
import async from '../middleware/async';
import idHandler from '../middleware/idHandler';

const router = Router();

router.route('/').get(async(RidersController.getAllRiders));
router.route('/:id').get(idHandler, async(RidersController.getOneRider));
router.route('/nearByDrivers/:location').get(async(RidersController.getNearByDrivers));

export default router;
