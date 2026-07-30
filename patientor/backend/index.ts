import express from 'express';
import cors from 'cors';
import diagnosisRouter from './src/routes/diagnoses.js';
// ИСПРАВЛЕНО: Добавлен импорт роутера пациентов
import patientRouter from './src/routes/patients.js'; 

const app = express();

app.use(cors());
app.use(express.json());

// Базовый роут проверки пинга по спецификации задания 9.8
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// Подключаем типизированный роутер диагнозов
app.use('/api/diagnoses', diagnosisRouter);

// ИСПРАВЛЕНО: Подключаем роутер пациентов к его законному эндпоинту!
app.use('/api/patients', patientRouter);

const PORT = 3001; // По спецификации Patientor бэкенд запускается на порту 3001

app.listen(PORT, () => {
  console.log(` Patientor backend running on port ${PORT}`);
});
