import express from 'express';

import SessionController from './controller/session_controller';
import UserController from './controller/user_controller';
import TestController from './controller/test_controller';

const routes = express.Router();

const userController = new UserController();
const sessionController = new SessionController();
const testController = new TestController();

routes.get('/', testController.test);
routes.post('/auth', sessionController.authentication);

routes.post('/protected/user/register', userController.create);
routes.get('/protected/users', userController.getAll);
routes.get('/protected/login', userController.login);

export default routes;