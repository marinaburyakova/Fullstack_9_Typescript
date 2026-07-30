import express from 'express';
import diagnosisService from '../services/diagnosisService.js';

const router = express.Router();

// ИСПРАВЛЕНО: Роут должен быть строго '/'
router.get('/', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

export default router;
