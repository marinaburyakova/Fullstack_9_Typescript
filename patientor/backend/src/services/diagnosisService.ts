import diagnosesData from '../../data/diagnoses.js';
// ИСПРАВЛЕНО: добавлен import type для verbatimModuleSyntax
import type { Diagnosis } from '../types/types.js';

// Принудительно типизируем импортированный JSON-массив
const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};
