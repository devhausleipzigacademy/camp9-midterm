import { Router } from 'express';
import {
  checkAuthController,
  loginController,
  logoutController,
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

//@route POST /api/1.0/user/logout
//@desc Logout user
//@access Public

router.delete('/logout', logoutController);

//@route GET /api/1.0/user/checkauth
//@desc check if user is authenticated
//@access Public

router.get('/checkauth', checkAuthController);

export default router;
