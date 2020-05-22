import { Router } from 'https://deno.land/x/oak/mod.ts';

import * as Controller from './controller.ts';


const router = new Router();

router
  .get('/users', Controller.getUsers)
  .get('/users/:name', Controller.getUser)
  .post('/users', Controller.addUser)
  .put('/users/:name', Controller.updateUser)
  .delete('/users/:name', Controller.removeUser)

export default router;