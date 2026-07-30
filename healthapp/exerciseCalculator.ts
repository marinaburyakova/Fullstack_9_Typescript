interface ExerciseValues {
  target: number;
  dailyExercises: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error('Not enough arguments! Пример: npx tsx exerciseCalculator.ts <target> <hours1> <hours2> ...');
  }

  const sliceArgs = args.slice(2);
  
  const numericArgs = sliceArgs.map(arg => {
    const num = Number(arg);
    if (isNaN(num)) {
      throw new Error('Provided values were not numbers! Все аргументы должны быть числами.');
    }
    return num;
  });

  // Деструктурируем массив. Если вдруг target окажется undefined (хотя проверка выше это исключает),
  // мы подстрахуем TypeScript значением по умолчанию (например, 0).
  const [target = 0, ...dailyExercises] = numericArgs;

  return {
    target,
    dailyExercises
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(hours => hours > 0).length;
  
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const average = periodLength > 0 ? totalHours / periodLength : 0;
  
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad, you need to train much harder';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'amazing job, target completely met or exceeded!';
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// Блок перехвата аргументов командной строки и безопасного выполнения
try {
  const { target, dailyExercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
