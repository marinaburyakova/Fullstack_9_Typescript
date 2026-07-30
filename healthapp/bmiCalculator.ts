// Описываем форму объекта, который вернет наш парсер аргументов
interface BmiValues {
  height: number;
  weight: number;
}

// Функция валидации аргументов командной строки process.argv
const parseBmiArguments = (args: string[]): BmiValues => {
  // Первые два элемента process.argv — это пути к Node.js и самому файлу скрипта.
  // Нам нужны строго 3-й и 4-й элементы (рост и вес)
  if (args.length < 4) throw new Error('Not enough arguments! Пример использования: npx tsx bmiCalculator.ts 180 74');
  if (args.length > 4) throw new Error('Too many arguments!');

  // Проверяем, что переданные строки являются валидными числами
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers! Рост и вес должны быть числами.');
  }
};

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Рост и вес должны быть больше нуля!');
  }
  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);

  if (bmi < 16.0) return 'Severe Thinness';
  if (bmi >= 16.0 && bmi < 17.0) return 'Moderate Thinness';
  if (bmi >= 17.0 && bmi < 18.5) return 'Mild Thinness';
  if (bmi >= 18.5 && bmi < 25.0) return 'Normal range';
  if (bmi >= 25.0 && bmi < 30.0) return 'Overweight';
  if (bmi >= 30.0 && bmi < 35.0) return 'Obese Class I';
  if (bmi >= 35.0 && bmi < 40.0) return 'Obese Class II';
  return 'Obese Class III';
};

// Блок перехвата аргументов и выполнения скрипта
try {
  const { height, weight } = parseBmiArguments(process.argv);
  const bmiResult = calculateBmi(height, weight);
  console.log(`Результат проверки: ${bmiResult}`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
