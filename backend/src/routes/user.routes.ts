import { Router } from 'express';
import {
  getSingleUserController,
  loginController,
  signupController,
} from '../controllers/user.controllers';
import { validate } from '../middleware/validateResource';
import { userValidation } from '../validate/userValidation';
import { loginValidation } from '../validate/loginValidation';

const router = Router();


//@route POST /api/1.0/user/signup
//@desc Register user
//@access Public

router.post('/signup', validate(userValidation), signupController);

//@route POST /api/1.0/user/login
//@desc Login user
//@access Public

router.post('/login', validate(loginValidation), loginController);

//@route GET /api/1.0/user/:id
//@desc Get a single user
//@access Private

router.get('/:id', getSingleUserController);



export default router;
