import { Router } from "express";
import { createUser, findAll, findOne, update, remove, logIn } from "../controllers/userController.js";
const router = Router();

router.post('/', createUser);
router.post('/login', logIn);
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;