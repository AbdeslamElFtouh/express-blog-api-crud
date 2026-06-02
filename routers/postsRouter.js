import express from 'express'
import { index, show, store, modify, destroy } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', index);
router.get('/:slug', show);
router.post('/', store);
router.put('/:slug', modify);
router.delete('/:slug', destroy);

export default router;




