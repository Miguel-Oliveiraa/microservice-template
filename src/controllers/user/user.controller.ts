import { Router, Request, Response } from 'express';
import { UserService } from '../../services/user/user.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { CreateUserDto } from '../../dtos/user/createUser.dto';

const userService = new UserService(new UserRepository());

const router = Router();

router.post(
  '/',
  async (req: Request<any, any, CreateUserDto>, res: Response) => {
    try {
      const { email, name } = req.body;
      const user = await userService.createUser({ email, name });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
);

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

export default router;
