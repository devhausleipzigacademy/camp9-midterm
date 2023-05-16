import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { bookingValidation } from '../validate/bookingValidation';
import { validate } from '../middleware/validateResource';
import { isAuth } from '../middleware/isAuth';
import { disabledSeatsController } from '../controllers/disabledSeats.controller';

const router = Router();

//@route POST /api/1.0/booking
//@desc booking movie by user
//@access Public // private ?

router.post('/', validate(bookingValidation), isAuth, bookingController);

router.get('/', disabledSeatsController);

export default router;
