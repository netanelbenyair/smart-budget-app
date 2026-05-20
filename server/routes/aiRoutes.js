import express from 'express';
import { analyzeExpense } from '../controllers/aiController.js';

const router = express.Router();

// אנחנו משתמשים ב-POST כי אנחנו שולחים מידע (טקסט) לשרת כדי שיעבד אותו
router.post('/analyze', analyzeExpense);

export default router;