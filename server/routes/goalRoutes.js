import express from 'express';

import { getGoals , createGoals , putGoals,deleteGoals } from '../controllers/goalController.js';

const router = express.Router();

router.get('/' , getGoals);
router.post('/',createGoals);
router.put('/:id' , putGoals);
router.delete('/:id' , deleteGoals);

export default router;