import express from 'express';
import cors from 'cors';
import { calculateBmi } from './bmiCalculator.js'; 
import { calculateExercises } from './exerciseCalculator.js'; 

const app = express();
const PORT = 3003;
app.use(cors());
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmiValue = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi: bmiValue
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  const targetNum = Number(target);
  
  if (
    isNaN(targetNum) || 
    !Array.isArray(daily_exercises) || 
    daily_exercises.some(day => isNaN(Number(day)))
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const exercisesNumArray = daily_exercises.map(day => Number(day));
  const result = calculateExercises(exercisesNumArray, targetNum);
  res.json(result);
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(` Server running on port ${PORT}`);
})