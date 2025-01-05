import { Router } from "express";
import { findAll, createTrain } from "../controllers/trainController.js";
const router = Router();

router.get('/', findAll);
router.post('/', createTrain);

export default router;