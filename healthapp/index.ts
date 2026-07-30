import express from 'express';
import { calculateBmi } from './bmiCalculator.js';
import { calculateExercises } from './exerciseCalculator.js';

const app = express();
app.use(express.json()); // Обязательно для парсинга тела POST-запросов

// 1. GET /hello — Тест проверяет получение приветственного сообщения
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// 2. GET /bmi — Вычисление ИМТ на основе параметров высоты и веса
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // Валидация query-параметров на пропуски или нечисловые значения
  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmiResult = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi: bmiResult
  });
});

// 3. POST /exercises — Вычисление аналитики тренировок из тела запроса
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: any = req.body;

  // Проверка №1: Отсутствие обязательных параметров в теле
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const targetNum = Number(target);
  
  // Проверка №2: Валидация массива и целевого значения на числовой тип
  if (isNaN(targetNum) || !Array.isArray(daily_exercises) || daily_exercises.some((d) => isNaN(Number(d)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // Приведение элементов массива к числам для безопасного вычисления
  const exercisesNums = daily_exercises.map((d) => Number(d));
  const result = calculateExercises(exercisesNums, targetNum);

  return res.json(result);
});

const PORT = 3003;

// КРИТИЧЕСКИ ВАЖНО ДЛЯ LINUX В ОБЛАКЕ GITHUB ACTIONS:
// Слушаем хост '::'. Это заставляет Express работать в режиме Dual-Stack (IPv4 + IPv6).
// Теперь запрос Playwright по адресу ::1:3003 мгновенно и успешно соединится с сервером!
app.listen(PORT, '::', () => {
  console.log(` Server running on port ${PORT}`);
});
