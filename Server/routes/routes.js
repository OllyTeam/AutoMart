import express from 'express';
import signup from '../controllers/signup';

const router = express.Router();
// signup Route
router.post('/signup', signup);

export default router;