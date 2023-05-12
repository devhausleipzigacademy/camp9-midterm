import { Router } from 'express';
import {
  checkAuthController,
  editProfileController,
  getSingleUserController,
  loginController,
  logoutController,
  signupController,
} from '../controllers/user.controllers';
import { validate } from '../middleware/validateResource';
import { editUserValidation, userValidation } from '../validate/userValidation';
import { loginValidation } from '../validate/loginValidation';
import { isAuth } from '../middleware/isAuth';

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

//@route GET /api/1.0/user/:id
//@desc Get a single user
//@access Private

router.get('/', isAuth, getSingleUserController);

//@route PATCH /api/1.0/user/editprofile
//@desc Edit user profile
//@access Private

router.patch(
  '/editprofile',
  isAuth,
  validate(editUserValidation),
  editProfileController
);

export default router;
