import { Router } from 'express';
import userController from './user/user.controller';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});
router.use('/users', userController);

export default router;
