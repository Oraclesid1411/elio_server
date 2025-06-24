import express from 'express';
import {
  createCategorie,
  getCategories,
  updateCategorie,
  deleteCategorie,
} from '../controllers/categorieController.js';

const router = express.Router();

router.post('/create', createCategorie);
router.get('/liste', getCategories);
router.put('/update/:id', updateCategorie);
router.delete('/delete/:id', deleteCategorie);

export default router;
