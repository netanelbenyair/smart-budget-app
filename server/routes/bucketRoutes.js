import express from 'express';

import { getB ,creatB , putB , deleteB } from '../controllers/bucketController.js';

const router = express.Router();

router.get('/',getB);
router.post('/',creatB);
router.put('/:id',putB);
router.delete('/:id',deleteB);

export default router