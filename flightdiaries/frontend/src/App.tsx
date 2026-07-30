import { useEffect, useState } from 'react';
import type { DiaryEntry, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Стейты формы
  const [date, setDate] = useState('');
 const [visibility, setVisibility] = useState<Visibility>('great');
const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const diarySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newEntry = { date, visibility, weather, comment };
      const addedEntry = await createDiary(newEntry);
      
      setDiaries(diaries.concat(addedEntry));
      
      // Очистка формы
      setDate('');
      setComment('');
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        // Задание 9.19: Ловим и выводим текстовую ошибку валидации от бэкенда
        setError(e.response?.data || e.message);
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px' }}>
      <h2>Add new entry</h2>
      
      {/* Вывод ошибки валидации красным цветом */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={diarySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ marginRight: '10px' }}><strong>Date:</strong></label>
          <input type="date" value={date} onChange={({ target }) => setDate(target.value)} required />
        </div>

        {/* Радиокнопки для Visibility (Задание 9.18) */}
        <div>
          <strong>Visibility: </strong>
 {(['great', 'good', 'ok', 'poor'] as const).map(v => (
            <label key={v} style={{ marginRight: '10px' }}>
              <input type="radio" name="visibility" checked={visibility === v} onChange={() => setVisibility(v)} />
              {v}
            </label>
          ))}
        </div>

        {/* Радиокнопки для Weather (Задание 9.18) */}
        <div>
          <strong>Weather: </strong>
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const).map(w => (
            <label key={w} style={{ marginRight: '10px' }}>
              <input type="radio" name="weather" checked={weather === w} onChange={() => setWeather(w)} />
              {w}
            </label>
          ))}
        </div>

        <div>
          <label style={{ marginRight: '10px' }}><strong>Comment:</strong></label>
          <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>

        <button type="submit" style={{ padding: '6px 12px', width: '80px', cursor: 'pointer' }}>Add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map(d => (
        <div key={d.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <h3>{d.date}</h3>
          <p style={{ margin: '4px 0' }}>visibility: {d.visibility}</p>
          <p style={{ margin: '4px 0' }}>weather: {d.weather}</p>
          {d.comment && <p style={{ margin: '4px 0', color: '#555' }}><i>comment: {d.comment}</i></p>}
        </div>
      ))}
    </div>
  );
};

export default App;
