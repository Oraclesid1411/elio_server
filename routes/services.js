import express from 'express';
import {
  createService,
  getServices,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

router.post('/create', createService);
router.get('/liste', getServices);
router.put('/update/:id', updateService);
router.delete('/delete/:id', deleteService);

// export default router;


export { router as servicesRouter }
// export default router;
