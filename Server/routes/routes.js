import express from 'express';
import signup from '../controllers/signup';
import login from '../controllers/login';

const router = express.Router();
// signup Route
router.post('/signup', signup);

// login Route
router.post('/login', login);

export default router;