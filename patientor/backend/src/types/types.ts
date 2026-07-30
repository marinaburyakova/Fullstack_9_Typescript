export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// Перечисление пола для строгой runtime-валидации (Задание 9.12)
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// --- БЛОК ОПИСАНИЯ ТИПОВ МЕДИЦИНСКИХ ЗАПИСЕЙ (ENTRIES) ---

// 1. Базовый интерфейс, свойства которого есть у абсолютно любого осмотра
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

// Перечисление числовых рейтингов состояния здоровья для HealthCheck осмотров
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// 2. Тип записи: Обычная проверка здоровья (HealthCheck) - именно её создаёт E2E-тест
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// 3. Тип записи: Осмотр в стационаре / Больнице (Hospital) - этот тип записи изначально у John McClane
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: {
    date: string;
    criteria: string;
  };
}

// 4. Тип записи: Профессиональный осмотр от работодателя (OccupationalHealthcare)
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

// КРИТИЧЕСКИ ВАЖНО: Объединение (Union) всех возможных видов медицинских записей в одну общую структуру
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// --- КОНЕЦ БЛОКА ENTRIES ---

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]; // Массив медицинских записей теперь официально встроен в модель пациента
}

// Нечувствительный тип данных: скрывает ssn и entries при выводе общей таблицы (Задание 9.10)
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
