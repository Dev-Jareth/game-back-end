import { Router } from 'express';
import { validateTokenMiddleware } from '../authenticate';
import secure from './secure';
import unsecure from './unsecure';
const router = Router();
router.use('/secure', validateTokenMiddleware, secure)
router.use('/', unsecure)

export default router;