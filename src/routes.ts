import express from 'express';

import SessionController from './controller/session_controller';
import UserController from './controller/user_controller';
import TestController from './controller/test_controller';

const routes = express.Router();

const userController = new UserController();
const sessionController = new SessionController();
const testController = new TestController();

routes.get('/', testController.test);
routes.post('/protected/user/register', userController.create);
routes.get('/protected/users', userController.getAll);
routes.post('/logIn', sessionController.logIn);

export default routes;