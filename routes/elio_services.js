
import express from 'express';
const router = express.Router();
// const elio_servicesController = require('../controllers/elio_servicesController');

// import { elio_servicesController } from '../controllers/elio_servicesController.js';
import { getAllServices ,createService } from '../controllers/elio_servicesController.js';

// Exemple de route pour récupérer tous les services
router.get('/getAllServices', getAllServices);

router.post('/', createService);

// Exemple de route pour ajouter un service
// router.post('/', serviceController.createService);

// Tu peux en ajouter plus : get/:id, put/:id, delete/:id etc.


export { router as elio_servicesRouter }
// module.exports = router;