import express from 'express';
import personController from '../controllers/person.controller.js';


const router = express.router({ mergeParams: true });

router.get('/:person/media', personController.personMedia);

router.get('/:personId', personController.personDetail);

export default router;