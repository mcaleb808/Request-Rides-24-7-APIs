import { Router } from 'express';
import tripsController from '../controllers/tripsController';
import async from '../middleware/async';
import TripValidator from '../middleware/tripValidator';

const router = Router();

router
  .route('/')
  .post(async(TripValidator.create), async(tripsController.createTrip))
  .get(async(tripsController.getAllTrips));
router.route('/:id/complete').put(async(tripsController.completeTrip));

export default router;
