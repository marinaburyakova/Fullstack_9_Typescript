import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { Patient } from '../types';
import patientService from '../services/patients';
import { apiBaseUrl } from '../constants';
import axios from 'axios';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
        setError(null);
      } catch (e: unknown) {
        console.error(e);
        setError('Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };
    void fetchPatient();
  }, [id]);

  // ИСПРАВЛЕНО: Тип события изменен на стандартный React.FormEvent для совместимости с MUI Box
  const submitNewEntry = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id || !patient) return;

    try {
      const newEntryData = {
        type: 'HealthCheck',
        date,
        description,
        specialist,
        healthCheckRating: 0,
      };

      console.log('Sending data to backend:', newEntryData);
      const response = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntryData,
      );
      console.log('Response received:', response.data);

      setPatient({
        ...patient,
        entries: patient.entries.concat(response.data),
      });
      setDate('');
      setDescription('');
      setSpecialist('');
      setShowForm(false);
    } catch (e: unknown) {
      console.error('CRITICAL ERROR DURING SUBMIT:', e);
      alert('Error adding new entry');
    }
  };

  if (loading) {
    return <Typography style={{ padding: '20px' }}>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" style={{ padding: '20px' }}>
        {error}
      </Typography>
    );
  }

  if (!patient) {
    return (
      <Typography style={{ padding: '20px' }}>Patient not found</Typography>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: 'bold', marginY: 2 }}
      >
        {patient.name}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        {showForm ? 'Cancel' : 'Add New Entry'}
      </Button>

      {showForm && (
        <Box
          component="form"
          onSubmit={submitNewEntry}
          sx={{
            border: '1px solid #1976d2',
            borderRadius: 2,
            padding: 3,
            marginBottom: 3,
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6">Add a new medical entry</Typography>

          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
            fullWidth
          />

          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
            fullWidth
          />

          <TextField
            label="Specialist"
            variant="outlined"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            required
            fullWidth
          />

          {/* ИСПРАВЛЕНО ДЛЯ ТЕСТА PLAYWRIGHT С ФЛАГОМ EXACT:
              Добавлено textTransform: 'none', чтобы кнопка рендерилась как "Add", а не "ADD" */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ marginTop: 1, textTransform: 'none' }}
            data-testid="submit-entry"
          >
            Add
          </Button>
        </Box>
      )}

      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 1 }}>
        entries
      </Typography>

      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry) => (
          <Card key={entry.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {entry.date} <i>{entry.specialist}</i>
              </Typography>
              <Typography variant="body1" sx={{ marginY: 1 }}>
                {entry.description}
              </Typography>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2">No entries yet</Typography>
      )}
    </div>
  );
};

export default PatientDetailPage;
