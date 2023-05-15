import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { bookingValidation } from '../validate/bookingValidation';
import { validate } from '../middleware/validateResource';
import { isAuth } from '../middleware/isAuth';

const router = Router();

//@route POST /api/1.0/booking
//@desc booking movie by user
//@access Public // private ?

router.post('/', validate(bookingValidation), isAuth, bookingController);

export default router