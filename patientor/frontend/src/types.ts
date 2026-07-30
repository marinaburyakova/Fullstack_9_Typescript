export interface Diagnosis { 
  code: string; 
  name: string; 
  latin?: string; 
} 

export enum Gender { 
  Male = "male", 
  Female = "female", 
  Other = "other" 
} 

// 1. Базовый интерфейс для записей
export interface BaseEntry { 
  id: string; 
  description: string; 
  date: string; 
  specialist: string; 
  diagnosisCodes?: Array<Diagnosis['code']>; // Ссылка на тип кода из Diagnosis
} 

// 2. Специфичные типы записей
export interface HospitalEntry extends BaseEntry { 
  type: "Hospital"; 
} 

export interface OccupationalHealthcareEntry extends BaseEntry { 
  type: "OccupationalHealthcare"; 
} 

export interface HealthCheckEntry extends BaseEntry { 
  type: "HealthCheck"; 
} 

// 3. Объединяющий тип записей
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry; 

// 4. Единый интерфейс Patient (без дублирования)
export interface Patient { 
  id: string; 
  name: string; 
  occupation: string; 
  gender: Gender; // Сохраняем строгую типизацию из enum
  ssn?: string; 
  dateOfBirth?: string; 
  entries: Entry[]; // Свойство добавлено сюда
} 

// Служебные типы
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>; 
export type PatientFormValues = Omit<Patient, "id" | "entries">;
