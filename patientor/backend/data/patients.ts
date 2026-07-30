const data = [
  {
    "id": "d2773336-f723-11e9-8f0b-362b9e155667",
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": "male",
    "occupation": "New york city cop",
    // ИСПРАВЛЕНО: Полный массив записей для Джона Макклейна, который ищет E2E-тест
    "entries": [
      {
        "id": "b4f4eca1-2ac3-43c5-888d-48373ba26042",
        "date": "2019-10-20",
        "specialist": "MD House",
        "type": "Hospital",
        "description": "Thumb has healed properly. Patient can return to full active duty.",
        "discharge": {
          "date": "2019-10-20",
          "criteria": "Healed"
        }
      }
    ]
  },
  {
    "id": "d2773598-f723-11e9-8f0b-362b9e155667",
    "name": "Martin Riggs",
    "dateOfBirth": "1979-01-30",
    "ssn": "300179-77A",
    "gender": "male",
    "occupation": "Cop",
    // ИСПРАВЛЕНО: Инициализируем пустой массив, чтобы фронтенд не падал из-за undefined
    "entries": []
  },
  {
    "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
    "name": "Hans Gruber",
    "dateOfBirth": "1970-04-25",
    "ssn": "250470-555L",
    "gender": "other",
    "occupation": "Technician",
    "entries": []
  },
  {
    "id": "d2773822-f723-11e9-8f0b-362b9e155667",
    "name": "Dana Scully",
    "dateOfBirth": "1974-01-05",
    "ssn": "050174-432N",
    "gender": "female",
    "occupation": "Forensic Pathologist",
    "entries": [
      {
        "id": "95166870-e9a6-4b20-bcbb-af1b339d1d3a",
        "date": "2019-08-05",
        "specialist": "Dr. Mulder",
        "type": "HealthCheck",
        "description": "Patient reports exceptional fatigue after field investigations.",
        "healthCheckRating": 1
      }
    ]
  },
  {
    "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
    "name": "Matti Luukkainen",
    "dateOfBirth": "1971-04-09",
    "ssn": "090471-8890",
    "gender": "male",
    "occupation": "Digital evangelist",
    "entries": []
  }
];

export default data;
