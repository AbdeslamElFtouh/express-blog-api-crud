import express from 'express'
import { index, show, store, modify, destroy } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/:id', store);
router.patch('/', modify);
router.delete('/:id', destroy);

export default router;