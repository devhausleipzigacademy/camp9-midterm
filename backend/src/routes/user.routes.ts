import { Router } from 'express';
import { signupController } from '../controllers/user.controllers';
import { z } from 'zod';
import { validate } from '../middleware/validateResource';
import { userValidation } from '../validate/uservalidation';

const router = Router();

//@route POST /api/1.0/user/signup
//@desc Register user
//@access Public

router.post('/signup', validate(userValidation), signupController);

export default router;
