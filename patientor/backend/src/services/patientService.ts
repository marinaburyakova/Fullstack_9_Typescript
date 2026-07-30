import crypto from 'crypto';
// Импортируем наш полный массив пациентов (с расширением .js по стандарту NodeNext)
import patientsData from '../../data/patients.js';
import type { Patient, NonSensitivePatient, Entry } from '../types/types.js';
import type { NewPatient } from '../utils/toNewPatient.js';

// Принудительно приводим массив к нашему строгому типу Patient[]
const patients: Patient[] = patientsData as Patient[];

// 1. Получение списка всех пациентов без поля ssn и entries (Задание 9.10)
const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// 2. ИСПРАВЛЕНО: Метод поиска конкретного пациента по id со всеми приватными данными (Задание 9.21)
const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

// 3. Создание нового пациента в системе с автоматической генерацией UUID (Задание 9.12)
const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: crypto.randomUUID(),
    entries: [], // Инициализируем пустой массив медицинских записей
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

// 4. ИСПРАВЛЕНО: Добавление новой медицинской записи (Entry) к конкретному пациенту (Задание 9.23)
const addEntryToPatient = (patientId: string, entry: Omit<Entry, 'id'>): Entry => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found in the database');
  }

  const newEntry: Entry = {
    id: crypto.randomUUID(), // Нативная генерация уникального ID для записи осмотра
    ...entry
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
};

// Экспортируем все методы, которые ожидает наш роутер
export default {
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntryToPatient
};
