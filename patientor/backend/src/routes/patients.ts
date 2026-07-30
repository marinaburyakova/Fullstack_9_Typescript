import express from 'express';
import patientService from '../services/patientService.js'; 
import toNewPatient from '../utils/toNewPatient.js'; 
import type { NewPatient } from '../utils/toNewPatient.js'; 
import type { Entry } from '../types/types.js'; 

const router = express.Router();

// 1. GET /api/patients/:id — Получение полной карточки ОДНОГО пациента (Задание 9.21)
router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

// 2. GET /api/patients — Получение списка ВСЕХ пациентов (Задание 9.10)
router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

// 3. POST /api/patients — Создание НОВОГО пациента (Задание 9.12)
router.post('/', (req, res) => {
  try {
    // Выводим в консоль данные от фронтенда для контроля
    console.log('--- Incoming new patient data ---', req.body);

    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown validation error';
    console.error('BACKEND POST PATIENT FAILED:', errorMessage);

    // ИСПРАВЛЕНО ДЛЯ СОВМЕСТИМОСТИ С ФРОНТЕНДОМ УНИВЕРСИТЕТА:
    // Передаем ошибку как чистую строку. Теперь фронтенд поймет её и покажет точное текстовое поле ошибки!
    res.status(400).send(errorMessage);
  }
});

// 4. POST /api/patients/:id/entries — Добавление новой записи осмотра (Задание 9.23)
router.post('/:id/entries', (req, res) => {
  try {
    const entryData = req.body as Omit<Entry, 'id'>;
    const addedEntry = patientService.addEntryToPatient(req.params.id, entryData);
    res.json(addedEntry);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown validation error';
    console.error('BACKEND POST ENTRY FAILED:', errorMessage);
    
    // Здесь также возвращаем чистую строку для безопасности
    res.status(400).send(errorMessage);
  }
});

export default router;
