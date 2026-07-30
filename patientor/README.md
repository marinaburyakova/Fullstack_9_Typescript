# Patientor — Medical Records System

A full-stack web application built with **TypeScript** for managing clinic patients, medical diagnoses, and historical health check examination records. Developed as part of **Part 9 of the Full Stack Open course (University of Helsinki)**.

The project is architected around strict compile-time type safety, automated runtime data validation, and an exhaustive end-to-end testing pipeline.

---

##  Core Features

- **Patient Management:** Seamlessly add, validate, and list clinical patients.
- **Data Privacy & Compliance (GDPR):** Automated data sanitization (`getNonSensitiveEntries`). Sensitive fields such as Social Security Numbers (SSN) and medical history are strictly stripped from public endpoints when listing patients.
- **Medical Entries System:** Comprehensive medical charts supporting multiple diagnostic entry types (`Hospital`, `OccupationalHealthcare`, and `HealthCheck`).
- **Diagnosis Directory:** Storage and retrieval of official ICD-10/ICD-11 international disease classification codes.
- **Runtime Type Validation (`toNewPatient.ts`):** A custom type-guarding parser that safely processes untrusted HTTP POST bodies incoming from the external non-typed world, strictly avoiding the `any` type.

---

##  Tech Stack

### Backend
- **Runtime Environment:** Node.js v24+
- **Language:** TypeScript (Strict compilation mode leveraging the modern `NodeNext` resolution module)
- **Framework:** Express.js
- **Tooling:** Cors, tsx (TypeScript Execute), Native Crypto API (for secure UUID v4 generation)

### Frontend
- **Build Tooling:** Vite + React + TypeScript
- **Design System:** Material UI (MUI v5)
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### Testing Pipeline
- **Automation Engine:** Playwright (100% green coverage for both native HTTP API requests and headless/headful browser E2E workflows)

